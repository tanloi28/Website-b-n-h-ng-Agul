import { TestBed } from '@angular/core/testing';

import { AthuathuAdminService } from './athuathu-admin.service';

describe('AthuathuAdminService', () => {
  let service: AthuathuAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthuathuAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
