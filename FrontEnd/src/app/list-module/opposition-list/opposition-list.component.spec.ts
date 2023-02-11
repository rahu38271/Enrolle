import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppositionListComponent } from './opposition-list.component';

describe('OppositionListComponent', () => {
  let component: OppositionListComponent;
  let fixture: ComponentFixture<OppositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OppositionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OppositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
