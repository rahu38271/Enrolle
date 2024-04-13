import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadMobiledataGroupComponent } from './upload-mobiledata-group.component';

describe('UploadMobiledataGroupComponent', () => {
  let component: UploadMobiledataGroupComponent;
  let fixture: ComponentFixture<UploadMobiledataGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMobiledataGroupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadMobiledataGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
