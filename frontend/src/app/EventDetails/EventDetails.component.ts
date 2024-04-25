import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EventService } from '../_services/event.service';
import { Event } from '../models/event.model'


@Component({
  selector: 'app-EventDetails',
  templateUrl: './EventDetails.component.html',
  styleUrls: ['./EventDetails.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId!: string; 
  eventDetails: any; 


  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {

    this.eventId = this.route.snapshot.paramMap.get('id')!;
        
    this.eventService.getEventById(this.eventId).subscribe(
      (data) => {
          console.log(data);
          this.eventDetails = data;
        },
        (error) => {
          console.error(error);
        }
     );
      
    /*
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id') || ''; 
      this.loadEventDetails();
    });
    */ 
  }

 /* 
  retrieveEvents(): void {
    this.eventService.getAll()
      .subscribe({
        next: (data) => {
          this.eventDetails = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  loadEventDetails() {
    this.eventService.get(this.eventId).subscribe(
      (data: any) => {
        this.eventDetails = data;
      },
      error => {
        console.error('Error fetching event details', error);
      }
    ); 
  }
  */
}
