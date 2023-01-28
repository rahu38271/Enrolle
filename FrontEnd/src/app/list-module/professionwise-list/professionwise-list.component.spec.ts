import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionwiseListComponent } from './professionwise-list.component';

describe('ProfessionwiseListComponent', () => {
  let component: ProfessionwiseListComponent;
  let fixture: ComponentFixture<ProfessionwiseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionwiseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionwiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
