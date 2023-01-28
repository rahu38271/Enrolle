import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYojnaComponent } from './add-yojna.component';

describe('AddYojnaComponent', () => {
  let component: AddYojnaComponent;
  let fixture: ComponentFixture<AddYojnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYojnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYojnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
