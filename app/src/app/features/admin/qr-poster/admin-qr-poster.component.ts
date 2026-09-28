import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';
import { it } from '../../../core/i18n/it';

// Genera il QR statico che punta a /iscriviti, da stampare o fotografare
// per la locandina fisica in palestra (vedi CLAUDE.md, "Flusso di
// iscrizione": "Route pubblica /iscriviti, raggiungibile dal QR della
// locandina"). window.location.origin funziona automaticamente sia in
// sviluppo/demo sia in produzione, senza bisogno di configurazione.
@Component({
  selector: 'app-admin-qr-poster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-qr-poster.component.html',
  styleUrl: './admin-qr-poster.component.scss',
})
export class AdminQrPosterComponent implements OnInit {
  readonly t = it.admin.qrPoster;
  readonly qrDataUrl = signal<string | null>(null);
  readonly signupUrl = `${window.location.origin}/iscriviti`;

  async ngOnInit(): Promise<void> {
    this.qrDataUrl.set(
      await QRCode.toDataURL(this.signupUrl, { margin: 1, width: 600, color: { dark: '#050505', light: '#ffffff' } }),
    );
  }

  download(): void {
    const url = this.qrDataUrl();
    if (!url) {
      return;
    }
    const link = document.createElement('a');
    link.href = url;
    link.download = 'steel-elite-qr-iscrizione.png';
    link.click();
  }

  print(): void {
    window.print();
  }
}
