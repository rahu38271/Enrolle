import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportBeneficiariesComponent } from './import-beneficiaries.component';

describe('ImportBeneficiariesComponent', () => {
  let component: ImportBeneficiariesComponent;
  let fixture: ComponentFixture<ImportBeneficiariesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBeneficiariesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
