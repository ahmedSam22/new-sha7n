import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutshipingComponent } from './outshiping.component';

describe('OutshipingComponent', () => {
  let component: OutshipingComponent;
  let fixture: ComponentFixture<OutshipingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutshipingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutshipingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
