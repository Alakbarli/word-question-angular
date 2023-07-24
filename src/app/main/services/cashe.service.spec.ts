import { TestBed } from '@angular/core/testing';

import { CasheService } from './cashe.service';

describe('CasheService', () => {
  let service: CasheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
