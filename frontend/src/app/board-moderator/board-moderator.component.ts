import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent {
  events?: Event[];
  currentEvent: Event = {};
  currentIndex = -1;
  title = '';
  
  stars = [1,2,3,4,5];
  getRepeatArray(count: number): any[] {
    return Array(count).fill(0);
  }
  constructor(private eventservice: EventService) { }

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
