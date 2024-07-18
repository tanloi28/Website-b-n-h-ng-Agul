import { TestBed } from '@angular/core/testing';

import { AthuseverService } from './athusever.service';

describe('AthuseverService', () => {
  let service: AthuseverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthuseverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
