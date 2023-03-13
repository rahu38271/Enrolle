import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewVoterComponent } from './edit-new-voter.component';

describe('EditNewVoterComponent', () => {
  let component: EditNewVoterComponent;
  let fixture: ComponentFixture<EditNewVoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewVoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
