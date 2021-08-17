import { TestBed } from '@angular/core/testing';

import { ErrService } from './err.service';

describe('ErrServiceService', () => {
  let service: ErrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
