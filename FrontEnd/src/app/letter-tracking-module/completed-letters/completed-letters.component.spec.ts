import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedLettersComponent } from './completed-letters.component';

describe('CompletedLettersComponent', () => {
  let component: CompletedLettersComponent;
  let fixture: ComponentFixture<CompletedLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedLettersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
