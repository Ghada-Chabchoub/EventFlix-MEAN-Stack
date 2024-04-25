import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthoriseEventComponent } from './admin-authorise-event.component';

describe('AdminAuthoriseEventComponent', () => {
  let component: AdminAuthoriseEventComponent;
  let fixture: ComponentFixture<AdminAuthoriseEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthoriseEventComponent]
    });
    fixture = TestBed.createComponent(AdminAuthoriseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
