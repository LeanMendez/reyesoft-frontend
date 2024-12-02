import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../core/services/system.service';
import { ExchangeCurrencyComponent } from './exchange-currency/exchange-currency.component';
import { CurrencyRates } from '../../core/models/currency.model';
import { NotExchangableCurrencyComponent } from './not-exchangable-currency/not-exchangable-currency.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { Systems } from '../../core/models/system.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  imports: [
    ExchangeCurrencyComponent,
    NotExchangableCurrencyComponent,
    LoaderComponent,
  ],
})
export class SystemDetailComponent implements OnInit {
  protected route = inject(ActivatedRoute);
  protected systemService = inject(SystemService);

  systemId: string = '';
  rates: CurrencyRates[] = [];
  filteredSystems: Systems[] = [];

  isLoadingRates: boolean = false;
  isLoadingSystems: boolean = false;

  get isLoading(): boolean {
    return this.isLoadingRates || this.isLoadingSystems;
  }

  // Verifica si el sistema seleccionado está en la lista de sistemas soportados para exchange
  get isSupportedSystem(): boolean {
    return this.filteredSystems.some((system) => system.id === this.systemId);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.systemId = params['id'];
      this.getRates();
    });
    this.getSystems();
  }

  // Obtiene la lista de sistemas soportados para exchange
  getSystems(): void {
    this.isLoadingSystems = true;
    this.systemService
      .getResources()
      .pipe(finalize(() => (this.isLoadingSystems = false)))
      .subscribe({
        next: (supportedSystems) => {
          this.filteredSystems = supportedSystems
            .map(
              (system) =>
                system.attributes.can_receive &&
                system.attributes.can_send &&
                !['dai', 'usdt', 'bitcoin'].includes(system.id) &&
                system
            )
            .filter((system) => system !== false);
        },
        error: (error) => {
          console.error('Error fetching systems:', error);
        },
      });
  }

  // Obtiene los rates del sistema
  getRates(): void {
    this.isLoadingRates = true;
    this.systemService
      .getRatesAssociated(this.systemId)
      .pipe(finalize(() => (this.isLoadingRates = false)))
      .subscribe({
        next: (data) => {
          this.rates = Object.entries(data).map(([key, value]) => ({
            name: key,
            ...value,
          }));
        },
        error: (error) => {
          console.error('Error fetching rates:', error);
        },
      });
  }
}
