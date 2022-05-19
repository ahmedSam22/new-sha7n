import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFeeCalculatorComponent } from './shipping-fee-calculator.component';

describe('ShippingFeeCalculatorComponent', () => {
  let component: ShippingFeeCalculatorComponent;
  let fixture: ComponentFixture<ShippingFeeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingFeeCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingFeeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
