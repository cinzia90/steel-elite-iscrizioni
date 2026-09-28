import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'se-signup-selected-plan-id';

// Stato del flusso di iscrizione condiviso tra gli step. Il piano scelto è
// tenuto anche in sessionStorage così un refresh a metà flusso non lo perde.
@Injectable({ providedIn: 'root' })
export class SignupStateService {
  readonly selectedPlanId = signal<string | null>(this.readStoredPlanId());

  setSelectedPlanId(planId: string): void {
    this.selectedPlanId.set(planId);
    sessionStorage.setItem(STORAGE_KEY, planId);
  }

  clear(): void {
    this.selectedPlanId.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private readStoredPlanId(): string | null {
    try {
      return sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
