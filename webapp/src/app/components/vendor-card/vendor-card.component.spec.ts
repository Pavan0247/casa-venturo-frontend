import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCardComponent } from './vendor-card.component';

describe('VendorCardComponent', () => {
  let component: VendorCardComponent;
  let fixture: ComponentFixture<VendorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorCardComponent]
    });
    fixture = TestBed.createComponent(VendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
