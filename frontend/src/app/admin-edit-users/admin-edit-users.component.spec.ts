import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUsersComponent } from './admin-edit-users.component';

describe('AdminEditUsersComponent', () => {
  let component: AdminEditUsersComponent;
  let fixture: ComponentFixture<AdminEditUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditUsersComponent]
    });
    fixture = TestBed.createComponent(AdminEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
