import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  eventName!: string;
  updatedEvent!: Event;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.updatedEvent = new Event();
  }
  submitted = false;


  ngOnInit(): void {
    this.eventName = this.route.snapshot.paramMap.get('event_name')!;
    this.loadEventDetails();
  }
  loadEventDetails(): void {
    this.eventService.findByEventName(this.eventName).subscribe({
      next: (data: any) => {
        this.updatedEvent = data;
      },
      error: (error) => {
        console.error('Error fetching event details', error);
      }
  });
  } 

  
  updateEvent(): void {
    this.eventService.updateEvent(this.eventName, this.updatedEvent).subscribe({
      next: (data) => {
        console.log('Event updated successfully', data);
        this.submitted = true;
      },
      error: (error) => {
        console.error('Error updating event', error);
      }
  });

}
}
