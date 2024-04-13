import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentByAdminComponent } from './appointment-by-admin.component';

describe('AppointmentByAdminComponent', () => {
  let component: AppointmentByAdminComponent;
  let fixture: ComponentFixture<AppointmentByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
