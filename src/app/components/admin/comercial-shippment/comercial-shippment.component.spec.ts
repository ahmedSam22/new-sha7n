import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialShippmentComponent } from './comercial-shippment.component';

describe('ComercialShippmentComponent', () => {
  let component: ComercialShippmentComponent;
  let fixture: ComponentFixture<ComercialShippmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComercialShippmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercialShippmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
