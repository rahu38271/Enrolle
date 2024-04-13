import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentByDateComponent } from './appointment-by-date.component';

describe('AppointmentByDateComponent', () => {
  let component: AppointmentByDateComponent;
  let fixture: ComponentFixture<AppointmentByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
