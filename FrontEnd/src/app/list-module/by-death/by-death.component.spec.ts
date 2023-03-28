import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByDeathComponent } from './by-death.component';

describe('ByDeathComponent', () => {
  let component: ByDeathComponent;
  let fixture: ComponentFixture<ByDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByDeathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
