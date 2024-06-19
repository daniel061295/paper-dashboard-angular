import { Injectable } from '@angular/core';
import { user } from './user.interface';
import { answer } from './answer.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignInService {

  token = "";

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<answer[]> {
    return this.http.post<answer[]>(
      "http://localhost:8000/data_collector/login",
      {
        "username": username,
        "password": password
      }
    );
  }
  isAuth() { return this.token.length > 0;}
}