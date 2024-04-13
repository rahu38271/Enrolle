import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApkVersionComponent } from './apk-version.component';

describe('ApkVersionComponent', () => {
  let component: ApkVersionComponent;
  let fixture: ComponentFixture<ApkVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApkVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApkVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
