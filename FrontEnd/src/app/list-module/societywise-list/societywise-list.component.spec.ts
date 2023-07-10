import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietywiseListComponent } from './societywise-list.component';

describe('SocietywiseListComponent', () => {
  let component: SocietywiseListComponent;
  let fixture: ComponentFixture<SocietywiseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietywiseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietywiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
