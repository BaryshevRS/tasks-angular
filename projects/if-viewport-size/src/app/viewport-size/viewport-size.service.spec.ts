import { TestBed } from '@angular/core/testing';

import { ViewportSizeService } from './viewport-size.service';

describe('ViewportSizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewportSizeService = TestBed.get(ViewportSizeService);
    expect(service).toBeTruthy();
  });
});
