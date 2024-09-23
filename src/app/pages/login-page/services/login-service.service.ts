import { Injectable } from '@angular/core';
import { user } from './user.interface';
import { answer } from './answer.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from 'app/constants';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<answer[]> {
    return this.http.post<answer[]>(
      `${HOST}/data_collector/login`,
      {
        "username": username,
        "password": password
      }
    );
  }
}