import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProfileComponent } from './edit-user-profile.component';

describe('EditUserProfileComponent', () => {
  let component: EditUserProfileComponent;
  let fixture: ComponentFixture<EditUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserProfileComponent]
    });
    fixture = TestBed.createComponent(EditUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
