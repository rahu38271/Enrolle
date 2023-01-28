import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CasteBoothwiseSummaryPage } from './caste-boothwise-summary.page';

describe('CasteBoothwiseSummaryPage', () => {
  let component: CasteBoothwiseSummaryPage;
  let fixture: ComponentFixture<CasteBoothwiseSummaryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteBoothwiseSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CasteBoothwiseSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
