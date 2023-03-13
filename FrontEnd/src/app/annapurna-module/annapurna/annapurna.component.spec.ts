import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnapurnaComponent } from './annapurna.component';

describe('AnnapurnaComponent', () => {
  let component: AnnapurnaComponent;
  let fixture: ComponentFixture<AnnapurnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnapurnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnapurnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
