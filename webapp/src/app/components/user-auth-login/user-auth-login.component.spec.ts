import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthLoginComponent } from './user-auth-login.component';

describe('UserAuthLoginComponent', () => {
  let component: UserAuthLoginComponent;
  let fixture: ComponentFixture<UserAuthLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAuthLoginComponent]
    });
    fixture = TestBed.createComponent(UserAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
