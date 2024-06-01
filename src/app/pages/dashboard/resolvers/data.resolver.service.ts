import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable , of} from "rxjs";
import { DatosService } from "../services/datos.service";
// import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common";

@Injectable({ providedIn: 'root'})
export class dataResolverService implements Resolve<any>{
    myDateToday = new Date();
    myDateNow = new Date();
    today:string;
    now:string;
    constructor( private datosService: DatosService) { }
    
    resolve(): Observable<any> {
        
        this.today = formatDate(this.myDateToday, 'yyyy-MM-dd','en-US');
        this.today = this.today + " 00:00:00" 
        this.now = formatDate(this.myDateNow, 'yyyy-MM-dd HH:mm:ss','en-US');
        
        // this.now = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
        console.log(this.today)
        console.log(this.now)
        // console.log(this.now)
        
        return this.datosService.getDataServ("0",this.today,this.now);
    }
}