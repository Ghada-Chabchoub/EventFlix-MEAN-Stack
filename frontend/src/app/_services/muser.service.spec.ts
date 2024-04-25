import { TestBed } from '@angular/core/testing';

import { MuserService } from './muser.service';

describe('MuserService', () => {
  let service: MuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
