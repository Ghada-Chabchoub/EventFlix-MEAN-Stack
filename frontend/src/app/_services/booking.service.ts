import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

const baseUrl = 'http://localhost:8080/api/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api'; 
  constructor( private http: HttpClient ) { }
  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(baseUrl);
  }

  get(id: any): Observable<Booking> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(bookingData:  any): Observable<any> {
    return this.http.post(baseUrl, bookingData);
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

  findByTitle(title: any): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${baseUrl}?title=${title}`);
  }
/*
  bookEvent(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/booking`, bookingData);
  }
  */
}
