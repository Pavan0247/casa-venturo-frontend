import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAuthSignupComponent } from './vendor-auth-signup.component';

describe('VendorAuthSignupComponent', () => {
  let component: VendorAuthSignupComponent;
  let fixture: ComponentFixture<VendorAuthSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorAuthSignupComponent]
    });
    fixture = TestBed.createComponent(VendorAuthSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
