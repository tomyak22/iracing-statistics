import { TestBed } from '@angular/core/testing';

import { IracingApiWrapperService } from './iracing-api-wrapper.service';

describe('IracingApiWrapperService', () => {
  let service: IracingApiWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IracingApiWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
