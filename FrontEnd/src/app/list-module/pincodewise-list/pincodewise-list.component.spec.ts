import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodewiseListComponent } from './pincodewise-list.component';

describe('PincodewiseListComponent', () => {
  let component: PincodewiseListComponent;
  let fixture: ComponentFixture<PincodewiseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PincodewiseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodewiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
