import { TestBed } from '@angular/core/testing';

import { DialogServerService } from './dialog-server.service';

describe('DialogServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogServerService = TestBed.get(DialogServerService);
    expect(service).toBeTruthy();
  });
});
