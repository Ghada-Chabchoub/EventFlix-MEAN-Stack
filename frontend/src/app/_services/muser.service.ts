import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Muser } from '../models/muser.model';

@Injectable({
  providedIn: 'root'
})
export class MuserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<Muser[]> {
    return this.http.get<Muser[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }


  // Get user by ID
  getUser(userId: string): Observable<Muser> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Muser>(url);
  }

  // Update user information
  updateUser(userId: string, updatedUser: Muser): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, updatedUser);
  }

   // Create a new user
   createUser(newUser: Muser): Observable<Muser> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<Muser>(url, newUser).pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(error);
      })
    );
  }

  // Delete a user by ID
  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(error);
      })
    );
  }

}
