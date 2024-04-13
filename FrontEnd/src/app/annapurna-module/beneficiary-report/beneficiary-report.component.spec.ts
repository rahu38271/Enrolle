import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryReportComponent } from './beneficiary-report.component';

describe('BeneficiaryReportComponent', () => {
  let component: BeneficiaryReportComponent;
  let fixture: ComponentFixture<BeneficiaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
