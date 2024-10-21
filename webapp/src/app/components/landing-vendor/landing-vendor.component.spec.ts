import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingVendorComponent } from './landing-vendor.component';

describe('LandingVendorComponent', () => {
  let component: LandingVendorComponent;
  let fixture: ComponentFixture<LandingVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingVendorComponent]
    });
    fixture = TestBed.createComponent(LandingVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
