import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterByDateComponent } from './letter-by-date.component';

describe('LetterByDateComponent', () => {
  let component: LetterByDateComponent;
  let fixture: ComponentFixture<LetterByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterByDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
