import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ResolveFn } from '@angular/router';

import { commentGuard } from './comment.guard';
import { Comments } from '../comment';

describe('commentGuard', () => {
  const executeGuard: ResolveFn<Comments> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => commentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
