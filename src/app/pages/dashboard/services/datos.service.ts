import { Injectable } from '@angular/core';
import { data } from './data.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  variableFalsa: string = "blabla"
  constructor(private http:HttpClient) { }

  getDataServ() : Observable<data[]>{
    return this.http.get<data[]>("http://localhost:8000/data_collector/getdata/");
  }

  getLastServ() : Observable<data[]>{
    return this.http.get<data[]>("http://localhost:8000/data_collector/getlast/");
  }
}
