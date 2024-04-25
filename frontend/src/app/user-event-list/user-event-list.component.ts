import { Component } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-event-list',
  templateUrl: './user-event-list.component.html',
  styleUrls: ['./user-event-list.component.css']
})
export class UserEventListComponent {
  events?: Event[];
  currentEvent: Event = {};
  currentIndex = -1;
  title = '';
  
  stars = [1,2,3,4,5];
  getRepeatArray(count: number): any[] {
    return Array(count).fill(0);
  }
  constructor(private eventservice: EventService,private router: Router) { }

  ngOnInit(): void {
    this.retrieveEvents();
  }
  retrieveEvents(): void {
    this.eventservice.getAll()
      .subscribe({
        next: (data) => {
          this.events = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveEvents();
    this.currentEvent = {};
    this.currentIndex = -1;
  }
  
  setActiveEvent(event: Event, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
  }
  removeAllEvents(): void {
    this.eventservice.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentEvent = {};
    this.currentIndex = -1;

    this.eventservice.findByEventName(this.title)
      .subscribe({
        next: (data) => {
          this.events = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
 