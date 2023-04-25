import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminwiseComponent } from './adminwise.component';

describe('AdminwiseComponent', () => {
  let component: AdminwiseComponent;
  let fixture: ComponentFixture<AdminwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
