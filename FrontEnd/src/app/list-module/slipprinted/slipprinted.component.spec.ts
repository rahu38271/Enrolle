import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipprintedComponent } from './slipprinted.component';

describe('SlipprintedComponent', () => {
  let component: SlipprintedComponent;
  let fixture: ComponentFixture<SlipprintedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipprintedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlipprintedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
