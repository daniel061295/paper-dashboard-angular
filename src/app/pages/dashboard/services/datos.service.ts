import { Injectable } from '@angular/core';
import { data } from './data.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getDataServ(id_nodo: string, fecha_inicio: string, fecha_fin: string): Observable<data[]> {
    return this.http.post<data[]>(
      "http://localhost:8000/data_collector/getdata/",
      {
        "id_nodo": id_nodo,
        "fecha_inicio": fecha_inicio,
        "fecha_fin": fecha_fin
      })
  }

  getLastServ(id_nodo: string): Observable<data[]> {
    return this.http.post<data[]>(
      "http://localhost:8000/data_collector/getlast/",
      { "id_nodo": id_nodo }

    );
  }
  
  downLoadData(id_nodo: string, fecha_inicio: string, fecha_fin: string): Observable<any>{
    return this.http.post<any>(
      "http://localhost:8000/data_collector/downloadcsv/",
      {
        "id_nodo": id_nodo,
        "fecha_inicio": fecha_inicio,
        "fecha_fin": fecha_fin
      },
      { 'responseType': 'blob' as 'json'}
    )
  }
}
