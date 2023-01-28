import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPincodeComponent } from './by-pincode.component';

describe('ByPincodeComponent', () => {
  let component: ByPincodeComponent;
  let fixture: ComponentFixture<ByPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByPincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
