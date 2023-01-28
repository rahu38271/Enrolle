import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterbyUserComponent } from './voterby-user.component';

describe('VoterbyUserComponent', () => {
  let component: VoterbyUserComponent;
  let fixture: ComponentFixture<VoterbyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoterbyUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterbyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
