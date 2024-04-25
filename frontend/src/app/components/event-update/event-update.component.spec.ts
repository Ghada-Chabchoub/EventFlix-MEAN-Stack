import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpdateComponent } from './event-update.component';

describe('EventUpdateComponent', () => {
  let component: EventUpdateComponent;
  let fixture: ComponentFixture<EventUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventUpdateComponent]
    });
    fixture = TestBed.createComponent(EventUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
