import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySocietyComponent } from './by-society.component';

describe('BySocietyComponent', () => {
  let component: BySocietyComponent;
  let fixture: ComponentFixture<BySocietyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BySocietyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BySocietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
