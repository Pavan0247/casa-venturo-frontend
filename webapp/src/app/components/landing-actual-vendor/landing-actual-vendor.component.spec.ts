import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingActualVendorComponent } from './landing-actual-vendor.component';

describe('LandingActualVendorComponent', () => {
  let component: LandingActualVendorComponent;
  let fixture: ComponentFixture<LandingActualVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingActualVendorComponent]
    });
    fixture = TestBed.createComponent(LandingActualVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
