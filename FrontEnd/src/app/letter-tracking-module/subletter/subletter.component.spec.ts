import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubletterComponent } from './subletter.component';

describe('SubletterComponent', () => {
  let component: SubletterComponent;
  let fixture: ComponentFixture<SubletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubletterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
