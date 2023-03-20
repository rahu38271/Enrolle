import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVoterComponent } from './new-voter.component';

describe('NewVoterComponent', () => {
  let component: NewVoterComponent;
  let fixture: ComponentFixture<NewVoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
