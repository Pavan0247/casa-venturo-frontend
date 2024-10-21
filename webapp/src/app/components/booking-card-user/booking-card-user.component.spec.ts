import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCardUserComponent } from './booking-card-user.component';

describe('BookingCardUserComponent', () => {
  let component: BookingCardUserComponent;
  let fixture: ComponentFixture<BookingCardUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCardUserComponent]
    });
    fixture = TestBed.createComponent(BookingCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
