import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonqComponent } from './commonq.component';

describe('CommonqComponent', () => {
  let component: CommonqComponent;
  let fixture: ComponentFixture<CommonqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
