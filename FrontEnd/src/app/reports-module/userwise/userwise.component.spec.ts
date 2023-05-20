import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwiseComponent } from './userwise.component';

describe('UserwiseComponent', () => {
  let component: UserwiseComponent;
  let fixture: ComponentFixture<UserwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
