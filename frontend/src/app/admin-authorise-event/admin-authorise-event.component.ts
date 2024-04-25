import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-authorise-event',
  templateUrl: './admin-authorise-event.component.html',
  styleUrls: ['./admin-authorise-event.component.css']
})

export class AdminAuthoriseEventComponent implements OnInit  {
  eventName!: string;
  updatedEvent!: Event;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.updatedEvent = new Event();
  }
 
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
      },
      error: (error) => {
        console.error('Error updating event', error);
      }
  });

}
onChangeStatus() {
  console.log('Updated event status:', this.updatedEvent.event_status);
}

}
 