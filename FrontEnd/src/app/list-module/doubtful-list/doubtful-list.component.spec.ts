import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubtfulListComponent } from './doubtful-list.component';

describe('DoubtfulListComponent', () => {
  let component: DoubtfulListComponent;
  let fixture: ComponentFixture<DoubtfulListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubtfulListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubtfulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
