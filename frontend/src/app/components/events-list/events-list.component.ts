import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events?: Event[];
  currentEvent: Event = {}; 
  currentIndex = -1;
  title = '';
  eventName!: string; 
  
  stars = [1,2,3,4,5];
  getRepeatArray(count: number): any[] {
    return Array(count).fill(0);
  }
  constructor(private eventservice: EventService,private router: Router) { }
  editEvent(eventName?: String): void {
    // Navigate to the edit page, passing the event name as a parameter
    this.router.navigate(['/edit-event', eventName]);
  }
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

  deleteEvent(eventName: any): void {
    this.eventservice.deleteByEventName(eventName).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }
  
}
 