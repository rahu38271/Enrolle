import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporBoothComponent } from './impor-booth.component';

describe('ImporBoothComponent', () => {
  let component: ImporBoothComponent;
  let fixture: ComponentFixture<ImporBoothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImporBoothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
