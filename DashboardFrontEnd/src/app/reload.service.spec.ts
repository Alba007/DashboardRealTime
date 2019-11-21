import { TestBed } from '@angular/core/testing';

import { ReloadService } from './reload.service';

describe('ReloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReloadService = TestBed.get(ReloadService);
    expect(service).toBeTruthy();
  });
});
