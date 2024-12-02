import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExchangableCurrencyComponent } from './not-exchangable-currency.component';

describe('NotExchangableCurrencyComponent', () => {
  let component: NotExchangableCurrencyComponent;
  let fixture: ComponentFixture<NotExchangableCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotExchangableCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotExchangableCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
