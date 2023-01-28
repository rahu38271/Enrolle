import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpVoterComponent } from './imp-voter.component';

describe('ImpVoterComponent', () => {
  let component: ImpVoterComponent;
  let fixture: ComponentFixture<ImpVoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpVoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
