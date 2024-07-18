import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cGuard } from './c.guard';

describe('cGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
