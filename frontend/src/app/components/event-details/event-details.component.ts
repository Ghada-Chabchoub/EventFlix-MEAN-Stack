import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit {
  eventName!: string;
  eventDetails: Event = {}; // Update this based on your actual Event model

  stars = [1,2,3,4,5];
  getStarArray(count: number): any[] {
    return Array.from({ length: count });
  }
  getRepeatArray(count: Number): any[] {
    return Array(count).fill(0);
  }
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventName = this.route.snapshot.paramMap.get('event_name')!;
    this.loadEventDetails();
  }

  loadEventDetails() {
    this.eventService.findByEventName(this.eventName).subscribe({
      next: (data: any) => {
        this.eventDetails = data;
      },
      error: (error) => {
        console.error('Error fetching event details', error);
      }
  });
  }
} 
  