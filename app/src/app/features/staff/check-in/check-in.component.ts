import { Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { SupabaseService } from '../../../core/services/supabase.service';
import { AuthService } from '../../../core/auth/auth.service';
import { MockBackendService } from '../../../core/mock/mock-backend.service';
import { environment } from '../../../../environments/environment';
import { it } from '../../../core/i18n/it';

interface CheckinResponse {
  result: 'granted' | 'denied';
  reason?: string;
  memberName: string;
  photoUrl: string | null;
  planName: string | null;
  endDate: string | null;
  certificateStatus: string;
}

interface MemberSearchResult {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

const RESULT_DISPLAY_MS = 3000;

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss',
})
export class CheckInComponent implements OnDestroy {
  readonly t = it.checkin;

  @ViewChild('video') videoElement?: ElementRef<HTMLVideoElement>;

  readonly scanning = signal(false);
  readonly torchOn = signal(false);
  readonly torchSupported = signal(false);
  readonly manualMode = signal(false);
  readonly resultData = signal<CheckinResponse | null>(null);
  readonly errorMessage = signal<string | null>(null);

  manualQuery = '';
  readonly manualResults = signal<MemberSearchResult[]>([]);

  private codeReader: BrowserQRCodeReader | null = null;
  private controls: IScannerControls | null = null;
  private processing = false;
  private resultTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly auth: AuthService,
    private readonly mock: MockBackendService,
  ) {}

  ngOnDestroy(): void {
    this.stopScanning();
  }

  async startScanning(): Promise<void> {
    this.errorMessage.set(null);
    this.resultData.set(null);

    if (!this.videoElement) {
      return;
    }

    try {
      this.codeReader = new BrowserQRCodeReader();
      this.controls = await this.codeReader.decodeFromConstraints(
        { video: { facingMode: 'environment' } },
        this.videoElement.nativeElement,
        (result) => {
          if (result && !this.processing) {
            this.handleScan(result.getText());
          }
        },
      );

      this.scanning.set(true);
      this.checkTorchSupport();
    } catch {
      this.errorMessage.set(this.t.cameraError);
    }
  }

  stopScanning(): void {
    this.controls?.stop();
    this.controls = null;
    this.scanning.set(false);
    this.torchSupported.set(false);
    this.torchOn.set(false);
  }

  private checkTorchSupport(): void {
    const stream = this.videoElement?.nativeElement.srcObject as MediaStream | undefined;
    const track = stream?.getVideoTracks()[0];
    const capabilities = track?.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
    this.torchSupported.set(!!capabilities?.torch);
  }

  async toggleTorch(): Promise<void> {
    const stream = this.videoElement?.nativeElement.srcObject as MediaStream | undefined;
    const track = stream?.getVideoTracks()[0];
    if (!track) {
      return;
    }
    const next = !this.torchOn();
    await track.applyConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] });
    this.torchOn.set(next);
  }

  private async handleScan(token: string): Promise<void> {
    this.processing = true;

    const staffId = this.auth.user()?.id ?? '';
    const data: CheckinResponse | null = environment.mock
      ? await this.mock.verifyCheckinQr(staffId, token)
      : (
          await this.supabase.client.functions.invoke<CheckinResponse>('verify-checkin', {
            body: { mode: 'qr', token },
          })
        ).data;

    if (!data) {
      this.errorMessage.set(this.t.errorGeneric);
      this.processing = false;
      return;
    }

    this.showResult(data);
  }

  private showResult(data: CheckinResponse): void {
    this.resultData.set(data);
    this.playFeedback(data.result === 'granted');

    if (this.resultTimeout) {
      clearTimeout(this.resultTimeout);
    }
    this.resultTimeout = setTimeout(() => {
      this.resultData.set(null);
      this.processing = false;
    }, RESULT_DISPLAY_MS);
  }

  scanAgainNow(): void {
    if (this.resultTimeout) {
      clearTimeout(this.resultTimeout);
    }
    this.resultData.set(null);
    this.processing = false;
  }

  private playFeedback(granted: boolean): void {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      oscillator.frequency.value = granted ? 880 : 220;
      oscillator.connect(ctx.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 180);
    } catch {
      // Audio non disponibile: non blocchiamo il check-in per questo.
    }

    if (navigator.vibrate) {
      navigator.vibrate(granted ? 100 : [120, 80, 120]);
    }
  }

  toggleManualMode(): void {
    this.manualMode.update((v) => !v);
    this.manualQuery = '';
    this.manualResults.set([]);
  }

  async searchMembers(): Promise<void> {
    if (this.manualQuery.trim().length < 2) {
      this.manualResults.set([]);
      return;
    }

    if (environment.mock) {
      this.manualResults.set(this.mock.searchMembers(this.manualQuery) as unknown as MemberSearchResult[]);
      return;
    }

    const { data } = await this.supabase.client
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('role', 'member')
      .or(`first_name.ilike.%${this.manualQuery}%,last_name.ilike.%${this.manualQuery}%`)
      .limit(10);

    this.manualResults.set((data as MemberSearchResult[]) ?? []);
  }

  async confirmManual(member: MemberSearchResult): Promise<void> {
    const staffId = this.auth.user()?.id ?? '';
    const data: CheckinResponse | null = environment.mock
      ? await this.mock.verifyCheckinManual(staffId, member.id)
      : (
          await this.supabase.client.functions.invoke<CheckinResponse>('verify-checkin', {
            body: { mode: 'manual', memberId: member.id },
          })
        ).data;

    if (!data) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    this.manualMode.set(false);
    this.showResult(data);
  }

  reasonLabel(reason: string | undefined): string {
    if (!reason) {
      return '';
    }
    return (this.t.reasons as Record<string, string>)[reason] ?? reason;
  }
}
