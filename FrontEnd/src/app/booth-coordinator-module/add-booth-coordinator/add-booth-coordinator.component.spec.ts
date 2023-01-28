import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBoothCoordinatorComponent } from './add-booth-coordinator.component';

describe('AddBoothCoordinatorComponent', () => {
  let component: AddBoothCoordinatorComponent;
  let fixture: ComponentFixture<AddBoothCoordinatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoothCoordinatorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoothCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
