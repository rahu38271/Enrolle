import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBoothCoordinatorComponent } from './edit-booth-coordinator.component';

describe('EditBoothCoordinatorComponent', () => {
  let component: EditBoothCoordinatorComponent;
  let fixture: ComponentFixture<EditBoothCoordinatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoothCoordinatorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBoothCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
