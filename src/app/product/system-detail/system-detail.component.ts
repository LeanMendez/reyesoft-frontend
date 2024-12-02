import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../core/services/system.service';
import { CurrencyCalculatorComponent } from './currency-calculator/currency-calculator.component';
import { CurrencyRates } from '../../core/models/currency.model';
import { NotExchangableCurrencyComponent } from './not-exchangable-currency/not-exchangable-currency.component';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.scss'],
  imports: [CurrencyCalculatorComponent, NotExchangableCurrencyComponent],
})
export class SystemDetailComponent implements OnInit {
  protected route = inject(ActivatedRoute);
  protected systemService = inject(SystemService);

  currentSystenId: string = '';
  currentRates: CurrencyRates[] = [];
  filteredSystems: string[] = [];

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.currentSystenId = params['id'];
      this.getRates(this.currentSystenId);
    });

    this.getSystems();
  }

  getSystems(): void {
    this.systemService.getResources().subscribe((data) => {
      this.filteredSystems = data.map(
        (system) =>
          (system.attributes.can_receive &&
          system.attributes.can_send &&
          !['dai', 'usdt', 'bitcoin'].includes(system.id)) && system.id
      ).filter((system) => system !== false);
    });
  }

  getRates(id: string): void {
    this.systemService.getRatesAssociated(id).subscribe((data) => {
      this.currentRates = Object.entries(data).map(([key, value]) => ({
        name: key,
        ...value,
      }));
    });
  }
}
