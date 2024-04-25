import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventListComponent } from './admin-event-list.component';

describe('AdminEventListComponent', () => {
  let component: AdminEventListComponent;
  let fixture: ComponentFixture<AdminEventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventListComponent]
    });
    fixture = TestBed.createComponent(AdminEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
