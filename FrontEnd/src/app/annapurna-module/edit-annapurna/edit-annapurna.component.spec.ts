import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnapurnaComponent } from './edit-annapurna.component';

describe('EditAnnapurnaComponent', () => {
  let component: EditAnnapurnaComponent;
  let fixture: ComponentFixture<EditAnnapurnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnnapurnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnapurnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
