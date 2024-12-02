import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyRates } from '../../../core/models/currency.model';

@Component({
  selector: 'app-currency-calculator',
  imports: [CommonModule],
  templateUrl: './currency-calculator.component.html',
  styleUrl: './currency-calculator.component.scss',
})
export class CurrencyCalculatorComponent implements OnChanges {
  @Input() currencies: CurrencyRates[] = [];

  selectedCurrency: CurrencyRates | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currencies'] && this.currencies.length > 0) {
      this.selectedCurrency = this.currencies[0];
    }
  }

  onSelectCurrency(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCurrency =
      this.currencies.find((currency) => currency.name === selectedValue) ||
      null;
    }
}
