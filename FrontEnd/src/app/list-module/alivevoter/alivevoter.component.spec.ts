import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlivevoterComponent } from './alivevoter.component';

describe('AlivevoterComponent', () => {
  let component: AlivevoterComponent;
  let fixture: ComponentFixture<AlivevoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlivevoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlivevoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
