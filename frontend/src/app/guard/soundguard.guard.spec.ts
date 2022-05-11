import { TestBed } from '@angular/core/testing';

import { SoundguardGuard } from './soundguard.guard';

describe('SoundguardGuard', () => {
  let guard: SoundguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SoundguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
