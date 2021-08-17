import { TestBed } from '@angular/core/testing';

import { TransferQuestionsService } from './transfer-questions.service';

describe('TransferQuestionsService', () => {
  let service: TransferQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
