import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlansService } from '../../../core/services/plans.service';
import { AuthService } from '../../../core/auth/auth.service';
import { SignupStateService } from '../signup-state.service';
import { Plan, PlanCategory } from '../../../shared/models/plan.model';
import { it } from '../../../core/i18n/it';

interface PlanGroup {
  category: PlanCategory;
  label: string;
  plans: Plan[];
}

@Component({
  selector: 'app-plan-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-select.component.html',
  styleUrl: './plan-select.component.scss',
})
export class PlanSelectComponent implements OnInit {
  readonly t = it.signup.planSelect;
  readonly groups = signal<PlanGroup[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private readonly plansService: PlansService,
    private readonly signupState: SignupStateService,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const plans = await this.plansService.listActivePlans();
      const order: PlanCategory[] = ['open', 'pt_privato', 'pt_small_group'];
      this.groups.set(
        order
          .map((category) => ({
            category,
            label: this.t.categories[category],
            plans: plans.filter((plan) => plan.category === category),
          }))
          .filter((group) => group.plans.length > 0),
      );
    } catch {
      this.errorMessage.set(this.t.error);
    } finally {
      this.loading.set(false);
    }
  }

  formatPrice(cents: number): string {
    return (cents / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  }

  choose(plan: Plan): void {
    this.signupState.setSelectedPlanId(plan.id);
    this.router.navigateByUrl(this.auth.isAuthenticated() ? '/iscriviti/profilo' : '/iscriviti/account');
  }
}
