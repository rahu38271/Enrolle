import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappContentComponent } from './whatsapp-content.component';

describe('WhatsappContentComponent', () => {
  let component: WhatsappContentComponent;
  let fixture: ComponentFixture<WhatsappContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
