import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { interval } from 'rxjs';
import { DatosService } from './services/datos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from "@angular/common";


// import { CartasComponent } from "../../shared/cartas/cartas.component"
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { text } from 'stream/consumers';
import { CookieService } from 'ngx-cookie-service';
import {Title} from "@angular/platform-browser";

import * as FileSaver from 'file-saver';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartTemp;
  public chartHum;
  public lineChart;
  dataResolver: any;
  response: any;
  public dataTemp: any[] = [];
  public dataHum: any[] = [];
  public dateTime: any[] = [];
  public subscription;


  datosCartas: Object;
  myDateToday = new Date();
  today: string = formatDate(this.myDateToday, 'yyyy-MM-dd', 'en-US');
  datePicked: any = this.today;
  datePickedInicio: any;
  datePickedFinal: any;
  lastDate: string;
  model: NgbDateStruct;
  modelInicio: NgbDateStruct;
  modelFinal: NgbDateStruct;
  flagToday: boolean = true;

  setDatosCartas(tempMax: string = "0", tempProm: string = "0", humMax: string = "0", humProm: string = "0") {
    this.datosCartas = [{
      titulo: "Temperatura promedio",
      valor: tempMax + "°C",
      icono: "tempMedia.png",
      colorIcono: "text-warning"
    },
    {
      titulo: "Temperatura maxima",
      valor: tempProm + "°C",
      icono: "tempMax.png",
      colorIcono: "text-success"
    },
    {
      titulo: "Humedad promedio",
      valor: humMax + "%",
      icono: "humMedia.png",
      colorIcono: "text-danger"
    },
    {
      titulo: "Humedad maxima",
      valor: humProm + "%",
      icono: "humMax.png",
      colorIcono: "text-primary"
    },

    ]
  };
  calcularPromedio(numerosStr: string[]): string {
    if (numerosStr.length === 0) {
      return "0"; // o podrías lanzar un error si lo prefieres
    }

    const numeros = numerosStr.map(numero => parseFloat(numero));
    const suma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
    const promedio = suma / numeros.length;

    return promedio.toFixed(2).toString();
  }
  encontrarMaximo(numerosStr: string[]): string {
    if (numerosStr.length === 0) {
      return "0"; // o podrías lanzar un error si lo prefieres
    }

    const numeros = numerosStr.map(numero => parseFloat(numero));
    const maximo = Math.max(...numeros);
    return maximo.toFixed(2).toString();
  }
  clearArray(dataArray: any[]) {
    while (dataArray.length > 0) {
      dataArray.pop();
    }
  }


  constructor(
    private datosService: DatosService,
    private route: ActivatedRoute,
    private titleService:Title) {
      this.titleService.setTitle("Dashboard");
     }

  pickDate() {
    let month = this.model.month < 10 ? "0" + this.model.month : this.model.month;
    let day = this.model.day < 10 ? "0" + this.model.day : this.model.day
    this.datePicked = this.model.year + "-" + month + "-" + day;
    if (this.datePicked == this.today) {
      this.subscription.unsubscribe;
      this.flagToday = true;
      this.getDayData();
      this.beginSubscription();



    } else {
      this.flagToday = false;
      this.subscription.unsubscribe();
      this.getDayData();
    }
  }
  pickDateInicio() {
    let month = this.modelInicio.month < 10 ? "0" + this.modelInicio.month : this.modelInicio.month;
    let day = this.modelInicio.day < 10 ? "0" + this.modelInicio.day : this.modelInicio.day
    this.datePickedInicio = this.modelInicio.year + "-" + month + "-" + day;

  }
  pickDateFinal() {
    let month = this.modelFinal.month < 10 ? "0" + this.modelFinal.month : this.modelFinal.month;
    let day = this.modelFinal.day < 10 ? "0" + this.modelFinal.day : this.modelFinal.day
    this.datePickedFinal = this.modelFinal.year + "-" + month + "-" + day;

  }

  beginSubscription() {
    this.subscription = interval(15e3).subscribe(x => {
      this.datosService.getLastServ("0").subscribe((result) => {
        this.response = result;
        if (this.response != null) {
          this.today = formatDate(this.myDateToday, 'yyyy-MM-dd', 'en-US');
          if (this.response[0].date_time.split('T')[0] === this.today && this.response[0].date_time != this.lastDate) {
            if (this.dateTime.length >= 48) {
              this.dataTemp.shift();
              this.dataHum.shift();
              this.dateTime.shift();
            }
            // console.log(this.response[0].date_time.length);

            this.dataTemp.push(this.response[0].temperatura);
            this.dataHum.push(this.response[0].humedad);
            this.dateTime.push(this.response[0].date_time.split('T')[1])

            this.lastDate = this.response[0].date_time;
            // console.log(this.dataTemp.length);
          }

        }

        this.chartTemp.update();
        this.chartHum.update();
        // console.log("en el last");
        // console.log(this.dateTime);
        this.setDatosCartas(this.calcularPromedio(this.dataTemp),
          this.encontrarMaximo(this.dataTemp),
          this.calcularPromedio(this.dataHum),
          this.encontrarMaximo(this.dataHum));
        // this.lineChart.update(); 
      });
    });

  }
  getDayData() {
    let dateStart = this.datePicked + " 00:00:00";
    let dateEnd = this.datePicked + " 23:59:59";

    this.datosService.getDataServ("0", dateStart, dateEnd).subscribe((result) => {
      let response = result;
      // console.log(response);
      if (response != null) {

        this.clearArray(this.dataTemp);
        this.clearArray(this.dataHum);
        this.clearArray(this.dateTime);

        for (let i = 0; i < response.length; i++) {
          this.dataTemp.push(response[i].temperatura);
          this.dataHum.push(response[i].humedad);
          this.dateTime.push(response[i].date_time.split('T')[1])

        }
        // console.log("De obtener el dato");
        // console.log(this.dataTemp);
        this.setDatosCartas(this.calcularPromedio(this.dataTemp),
          this.encontrarMaximo(this.dataTemp),
          this.calcularPromedio(this.dataHum),
          this.encontrarMaximo(this.dataHum));
        this.chartTemp.update();
        this.chartHum.update();
        // console.log(this.dataTemp.length);
        // console.log(this.dataHum.length);
      }
    });
  }

downloadData(){
  let dateStart = this.datePickedInicio + " 00:00:00";
  let dateEnd = this.datePickedFinal + " 23:59:59"
  this.datosService.downLoadData("0",dateStart,dateEnd).subscribe((result) => {
    let blob = new Blob([result], { type: 'text/csv' });
    FileSaver.saveAs(blob, "data.csv")
  })
}


  ngOnInit(): void {
    // console.log(this.today);
    this.setDatosCartas();
    try {
      this.dataResolver = this.route.snapshot.data['dataResolver']
    } catch (e) {
      console.log(e)
    };

    if (this.dataResolver != null || this.dataResolver.length != 0) {
      for (let i = 0; i < this.dataResolver.length; i++) {
        this.dataTemp.push(this.dataResolver[i].temperatura);
        this.dataHum.push(this.dataResolver[i].humedad);
        this.dateTime.push(this.dataResolver[i].date_time.split('T')[1])
        this.setDatosCartas(this.calcularPromedio(this.dataTemp),
          this.encontrarMaximo(this.dataTemp),
          this.calcularPromedio(this.dataHum),
          this.encontrarMaximo(this.dataHum));
      }
      this.lastDate = this.dataResolver[this.dataResolver.length - 1].date_time;
      // console.log(this.dateTime);
    }

    this.beginSubscription();



    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("chartTemp");
    this.ctx = this.canvas.getContext("2d");
    this.chartTemp = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.dateTime,
        datasets: [
          {
            borderColor: "#f17e5d",
            backgroundColor: "transparent",
            pointRadius: 4,
            // pointHoverRadius: 4,
            borderWidth: 3,

            // pointBorderWidth: 8,
            pointBorderColor: 'transparent',
            data: this.dataTemp,
            label: "Temperatura [°C]"
          }
        ]
      },
      options: {
        legend: {
          display: false,
          position: 'right'
        },

        tooltips: {
          enabled: true
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: true,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });

    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("chartHum");
    this.ctx = this.canvas.getContext("2d");
    this.chartHum = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.dateTime,
        datasets: [
          {
            borderColor: "#51CACF",
            backgroundColor: "transparent",
            pointRadius: 4,
            // pointHoverRadius: 4,
            borderWidth: 3,
            // pointBorderWidth: 8,
            pointBorderColor: 'transparent',

            data: this.dataHum,
          }
        ]
      },
      options: {
        legend: {
          display: false,
          position: 'top'
        },

        tooltips: {
          enabled: true
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: true,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });

  }

}


