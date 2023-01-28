import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuperadminComponent } from './add-superadmin.component';

describe('AddSuperadminComponent', () => {
  let component: AddSuperadminComponent;
  let fixture: ComponentFixture<AddSuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuperadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
