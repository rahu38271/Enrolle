import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWardComponent } from './import-ward.component';

describe('ImportWardComponent', () => {
  let component: ImportWardComponent;
  let fixture: ComponentFixture<ImportWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportWardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
