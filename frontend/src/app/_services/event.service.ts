import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

const baseUrl = 'http://localhost:8080/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api'; 
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  constructor( private http: HttpClient ) { }

  find(id:String): Observable<any> {
  
    return this.http.get(this.apiUrl + '/EventDetails/' + id)
  
  }
  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl);
  }

  get(id: any): Observable<Event> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByEventName(eventName: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events/${eventName}`);
  }

  updateEvent(eventName: string, updatedEventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/events//${eventName}`, updatedEventData);
  }

  deleteByEventName(eventName: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${eventName}`);
  }

  // asma methods
  getEventDetails(eventId: String): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}`; 
    return this.http.get(url);
  }
  getEventById(eventId: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/events/${eventId}`);
  }
  getEvents(eventName?: string): Observable<any> {
    let params = new HttpParams();
    if (eventName) {
      params = params.set('?event_name=', eventName);
    }

    return this.http.get(this.apiUrl, { params });
  }

}
