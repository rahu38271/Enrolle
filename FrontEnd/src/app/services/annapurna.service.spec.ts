import { TestBed } from '@angular/core/testing';

import { AnnapurnaService } from './annapurna.service';

describe('AnnapurnaService', () => {
  let service: AnnapurnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnapurnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
