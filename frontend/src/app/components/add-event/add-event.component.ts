import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
   event: Event = {
    event_id : this.generateRandomEventId(),
    moderator_id: '653047f4ddcbdc763a5b3f48',
    event_name: '',
    event_artist: '',
    event_duration: NaN,
    event_start: '',
    event_end: '', 
    event_location: '',
    event_category: '',
    event_rating: NaN,
    event_description: '',
    event_picture: '',
    event_status: 'pending'
  }

  submitted = false;

  constructor(private eventservice: EventService){}



  ngOnInit(): void {

  }

  private generateRandomEventId(): string {
  
    const randomNumber = Math.floor(Math.random() * 1000000); 
    return `event_${randomNumber}`;
  }

  saveEvent(): void {
    function extractFileNameFromPath(fullPath: String): String {

      const pathParts = fullPath.split('\\');
      const fileName = pathParts[pathParts.length - 1];
  
      if (fileName.includes('fakepath')) {
          return fileName.split('fakepath')[1];
      }
  
      return fileName;
      
    }
    const event_picture: String  | undefined = this.event.event_picture;
    const extractedFileName: String = event_picture ? extractFileNameFromPath(event_picture) : '';
    const data = {
      event_id: this.event.event_id,
      moderator_id: this.event.moderator_id,
      event_name: this.event.event_name,
      event_artist: this.event.event_artist,
      event_duration: this.event.event_duration,

      event_start: this.event.event_start,
      event_end: this.event.event_end,
      event_location: this.event.event_location,
      event_category: this.event.event_category,
      event_rating: this.event.event_rating,
      event_description: this.event.event_description,
      event_picture: extractFileNameFromPath(extractedFileName),
      event_status: this.event.event_status

    };

    this.eventservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newEvent(): void {
    this.submitted = false;
    this.event = {

      event_id: this.generateRandomEventId(),
      moderator_id: null,
      event_name: '',
      event_artist: '',
      event_duration: 0,
      event_start: '',
      event_end: '',
      event_location: 'ggggg',
      event_category: '',
      event_rating: 0,
      event_description: '',
      event_picture: '',
      event_status: 'pending'

    };
  }



}
 