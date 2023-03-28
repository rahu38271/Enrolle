import { TestBed } from '@angular/core/testing';

import { NewVoterService } from './new-voter.service';

describe('NewVoterService', () => {
  let service: NewVoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewVoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
