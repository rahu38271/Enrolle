import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YojnaComponent } from './yojna.component';

describe('YojnaComponent', () => {
  let component: YojnaComponent;
  let fixture: ComponentFixture<YojnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YojnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YojnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
