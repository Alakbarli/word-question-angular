import { TestBed } from '@angular/core/testing';

import { TextCortexAiService } from './text-cortex-ai.service';

describe('TextCortexAiService', () => {
  let service: TextCortexAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextCortexAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
