import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorwiseListComponent } from './colorwise-list.component';

describe('ColorwiseListComponent', () => {
  let component: ColorwiseListComponent;
  let fixture: ComponentFixture<ColorwiseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorwiseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorwiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
