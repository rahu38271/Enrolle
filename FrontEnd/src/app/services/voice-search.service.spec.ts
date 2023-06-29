import { TestBed } from '@angular/core/testing';

import { VoiceSearchService } from './voice-search.service';

describe('VoiceSearchService', () => {
  let service: VoiceSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
