import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwarehousesComponent } from './outwarehouses.component';

describe('OutwarehousesComponent', () => {
  let component: OutwarehousesComponent;
  let fixture: ComponentFixture<OutwarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwarehousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
