import { TestBed } from '@angular/core/testing';

import { SettlementsDetailsService } from './settlements-details.service';

describe('SettlementsDetailsService', () => {
  let service: SettlementsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettlementsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
