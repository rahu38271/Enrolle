import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVoterComponent } from './add-new-voter.component';

describe('AddNewVoterComponent', () => {
  let component: AddNewVoterComponent;
  let fixture: ComponentFixture<AddNewVoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewVoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
