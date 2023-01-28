import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoterInclinationBoothwisePage } from './voter-inclination-boothwise.page';

describe('VoterInclinationBoothwisePage', () => {
  let component: VoterInclinationBoothwisePage;
  let fixture: ComponentFixture<VoterInclinationBoothwisePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterInclinationBoothwisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoterInclinationBoothwisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
