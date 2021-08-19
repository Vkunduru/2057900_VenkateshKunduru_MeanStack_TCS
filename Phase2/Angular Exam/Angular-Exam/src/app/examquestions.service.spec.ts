import { TestBed } from '@angular/core/testing';

import { ExamquestionsService } from './examquestions.service';

describe('ExamquestionsService', () => {
  let service: ExamquestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamquestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
