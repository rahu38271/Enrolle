import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadvoterComponent } from './deadvoter.component';

describe('DeadvoterComponent', () => {
  let component: DeadvoterComponent;
  let fixture: ComponentFixture<DeadvoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadvoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadvoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
