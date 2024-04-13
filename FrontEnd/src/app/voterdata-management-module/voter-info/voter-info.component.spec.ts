import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterInfoComponent } from './voter-info.component';

describe('VoterInfoComponent', () => {
  let component: VoterInfoComponent;
  let fixture: ComponentFixture<VoterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoterInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
