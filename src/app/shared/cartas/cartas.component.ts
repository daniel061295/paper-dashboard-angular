import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.scss']
})
export class CartasComponent implements OnInit {

  constructor() { }
  @Input() titulo:string;
  @Input() valor:string;
  @Input() icono:string;
  @Input() colorIcono:string;

  
  get getValor():string{
    return this.valor;
  }

  @Input()
  set setValor(valor:string){
    this.valor = valor;
  }

  ngOnInit(): void {


  }

}
