import { TestBed } from '@angular/core/testing';

import { EmailSpecificVendorService } from './email-specific-vendor.service';

describe('EmailSpecificVendorService', () => {
  let service: EmailSpecificVendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSpecificVendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
