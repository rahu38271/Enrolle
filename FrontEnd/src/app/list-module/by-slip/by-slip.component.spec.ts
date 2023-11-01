import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySlipComponent } from './by-slip.component';

describe('BySlipComponent', () => {
  let component: BySlipComponent;
  let fixture: ComponentFixture<BySlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BySlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BySlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
