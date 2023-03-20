import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnapurnaComponent } from './add-annapurna.component';

describe('AddAnnapurnaComponent', () => {
  let component: AddAnnapurnaComponent;
  let fixture: ComponentFixture<AddAnnapurnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnapurnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnnapurnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
