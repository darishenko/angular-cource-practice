import { TestBed } from '@angular/core/testing';

import { FilterQueryService } from './filter.query.service';

describe('FilterQueryService', () => {
  let service: FilterQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
