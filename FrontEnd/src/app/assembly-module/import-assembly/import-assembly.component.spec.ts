import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAssemblyComponent } from './import-assembly.component';

describe('ImportAssemblyComponent', () => {
  let component: ImportAssemblyComponent;
  let fixture: ComponentFixture<ImportAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportAssemblyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
