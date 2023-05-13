import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysComplaintComponent } from './todays-complaint.component';

describe('TodaysComplaintComponent', () => {
  let component: TodaysComplaintComponent;
  let fixture: ComponentFixture<TodaysComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
