import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedvoterComponent } from './votedvoter.component';

describe('VotedvoterComponent', () => {
  let component: VotedvoterComponent;
  let fixture: ComponentFixture<VotedvoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotedvoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotedvoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
