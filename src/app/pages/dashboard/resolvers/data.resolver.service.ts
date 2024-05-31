import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable , of} from "rxjs";
import { DatosService } from "../services/datos.service";

@Injectable({ providedIn: 'root'})
export class dataResolverService implements Resolve<any>{
    
    constructor(private datosService: DatosService) { }
    
    resolve(): Observable<any> {
        
        return this.datosService.getDataServ();
    }
}