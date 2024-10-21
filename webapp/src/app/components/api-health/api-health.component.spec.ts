import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiHealthComponent } from './api-health.component';

describe('ApiHealthComponent', () => {
  let component: ApiHealthComponent;
  let fixture: ComponentFixture<ApiHealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiHealthComponent]
    });
    fixture = TestBed.createComponent(ApiHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
