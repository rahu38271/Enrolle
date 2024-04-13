import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseEnquiryComponent } from './datewise-enquiry.component';

describe('DatewiseEnquiryComponent', () => {
  let component: DatewiseEnquiryComponent;
  let fixture: ComponentFixture<DatewiseEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatewiseEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatewiseEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
