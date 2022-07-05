import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenproductsComponent } from './forbiddenproducts.component';

describe('ForbiddenproductsComponent', () => {
  let component: ForbiddenproductsComponent;
  let fixture: ComponentFixture<ForbiddenproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
