import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDataComponent } from './assign-data.component';

describe('AssignDataComponent', () => {
  let component: AssignDataComponent;
  let fixture: ComponentFixture<AssignDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
