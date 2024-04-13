import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByProfessionComponent } from './by-profession.component';

describe('ByProfessionComponent', () => {
  let component: ByProfessionComponent;
  let fixture: ComponentFixture<ByProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByProfessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
