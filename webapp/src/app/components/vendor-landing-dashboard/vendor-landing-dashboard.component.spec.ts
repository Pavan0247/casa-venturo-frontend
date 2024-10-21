import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorLandingDashboardComponent } from './vendor-landing-dashboard.component';

describe('VendorLandingDashboardComponent', () => {
  let component: VendorLandingDashboardComponent;
  let fixture: ComponentFixture<VendorLandingDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorLandingDashboardComponent]
    });
    fixture = TestBed.createComponent(VendorLandingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
