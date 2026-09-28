import { Component } from '@angular/core';
import { MockBackendService } from '../../../core/mock/mock-backend.service';

@Component({
  selector: 'app-demo-banner',
  standalone: true,
  template: `
    <div class="demo-banner">
      <span>
        <strong>MODALITÀ DEMO</strong> — nessun dato reale. Admin: admin&#64;demo.steelelite.it / demo1234 · Staff:
        staff&#64;demo.steelelite.it / demo1234
      </span>
      <button (click)="reset()">Reset dati demo</button>
    </div>
  `,
  styles: [
    `
      .demo-banner {
        position: sticky;
        top: 0;
        z-index: 1000;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 8px 16px;
        background: #c9a227;
        color: #050505;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
      }

      button {
        border: 1px solid #050505;
        background: transparent;
        color: #050505;
        padding: 2px 10px;
        border-radius: 4px;
        font-weight: 700;
        font-size: 11px;
        cursor: pointer;
      }
    `,
  ],
})
export class DemoBannerComponent {
  constructor(private readonly mock: MockBackendService) {}

  reset(): void {
    this.mock.resetDemo();
    window.location.href = '/';
  }
}
