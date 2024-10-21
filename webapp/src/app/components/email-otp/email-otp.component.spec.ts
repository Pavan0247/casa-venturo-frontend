import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOtpComponent } from './email-otp.component';

describe('EmailOtpComponent', () => {
  let component: EmailOtpComponent;
  let fixture: ComponentFixture<EmailOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailOtpComponent]
    });
    fixture = TestBed.createComponent(EmailOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});