import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingcalculatorComponent } from './shippingcalculator.component';

describe('ShippingcalculatorComponent', () => {
  let component: ShippingcalculatorComponent;
  let fixture: ComponentFixture<ShippingcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingcalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
