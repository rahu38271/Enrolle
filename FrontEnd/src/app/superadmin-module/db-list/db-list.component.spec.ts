import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbListComponent } from './db-list.component';

describe('DbListComponent', () => {
  let component: DbListComponent;
  let fixture: ComponentFixture<DbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
