import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLettersComponent } from './pending-letters.component';

describe('PendingLettersComponent', () => {
  let component: PendingLettersComponent;
  let fixture: ComponentFixture<PendingLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingLettersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
