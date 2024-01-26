import { TestBed } from '@angular/core/testing';

import { TimelineDetailsService } from './timeline-details.service';

describe('TimelineDetailsService', () => {
  let service: TimelineDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
