import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotvotedvoterComponent } from './notvotedvoter.component';

describe('NotvotedvoterComponent', () => {
  let component: NotvotedvoterComponent;
  let fixture: ComponentFixture<NotvotedvoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotvotedvoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotvotedvoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
