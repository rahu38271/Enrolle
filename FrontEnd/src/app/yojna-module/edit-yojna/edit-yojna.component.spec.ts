import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYojnaComponent } from './edit-yojna.component';

describe('EditYojnaComponent', () => {
  let component: EditYojnaComponent;
  let fixture: ComponentFixture<EditYojnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYojnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYojnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
