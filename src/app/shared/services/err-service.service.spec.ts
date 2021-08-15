import { TestBed } from '@angular/core/testing';

import { ErrServiceService } from './err-service.service';

describe('ErrServiceService', () => {
  let service: ErrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
