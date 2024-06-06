import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import  {interval} from 'rxjs';
import { DatosService } from './services/datos.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";
import { CartasComponent } from "../../shared/cartas/cartas.component"
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
  dataResolver:any;
  response: any;
  public dataTemp: any[] = [];
  public dataHum: any[] = [];
  public dateTime: any[] = [];
  datosCartas: Object;
  myDateToday = new Date();
  today:string;
  lastDate:string;

  setDatosCartas(tempMax:string="0",tempProm:string="0",humMax:string="0",humProm:string="0") { 
    this.datosCartas = [{
        titulo: "Temperatura promedio",
        valor: tempMax + "°C",
        icono: "nc-globe",
        colorIcono: "text-warning"
      },
      {
        titulo: "Temperatura maxima",
        valor: tempProm + "°C",
        icono: "nc-money-coins",
        colorIcono: "text-success"
      },
      {
        titulo: "Humedad promedio",
        valor: humMax + "%",
        icono: "nc-vector",
        colorIcono: "text-danger"
      },
      {
        titulo: "Humedad maxima",
        valor: humProm + "%",
        icono: "nc-favourite-28",
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
  return maximo.toString();
}


  constructor(
    private datosService: DatosService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.setDatosCartas();
    try {
      this.dataResolver = this.route.snapshot.data['dataResolver']
    }catch(e){
      console.log(e)
    };

    if (this.dataResolver != null || this.dataResolver.length != 0) {
      for (let i = 0; i < this.dataResolver.length; i++) {
        this.dataTemp.push(this.dataResolver[i].temperatura);
        this.dataHum.push(this.dataResolver[i].humedad);
        this.dateTime.push(this.dataResolver[i].date_time.split('T')[1])
        this.setDatosCartas(  this.calcularPromedio(this.dataTemp),
                                this.encontrarMaximo(this.dataTemp),
                                this.calcularPromedio(this.dataHum),
                                this.encontrarMaximo(this.dataHum));;
      }
      this.lastDate = this.dataResolver[this.dataResolver.length-1].date_time;
    }

    

    interval(15e3).subscribe(x=>{
        this.datosService.getLastServ("0").subscribe((result) => {
          this.response = result;
          if (this.response != null) {
            this.today = formatDate(this.myDateToday, 'yyyy-MM-dd','en-US');
            if (this.response[0].date_time.split('T')[0] === this.today && this.response[0].date_time!=this.lastDate) {
              if (this.dateTime.length >= 12 ){
                this.dataTemp.shift();
                this.dataHum.shift();
                this.dateTime.shift();
              } 
              console.log(this.response[0].date_time);
              console.log(this.lastDate);
              this.dataTemp.push(this.response[0].temperatura);
              this.dataHum.push(this.response[0].humedad);
              this.dateTime.push(this.response[0].date_time.split('T')[1])
              
              this.lastDate = this.response[0].date_time;
            }
            
          }
          this.chartTemp.update(); 
          this.chartHum.update();
          this.setDatosCartas(  this.calcularPromedio(this.dataTemp),
                                this.encontrarMaximo(this.dataTemp),
                                this.calcularPromedio(this.dataHum),
                                this.encontrarMaximo(this.dataHum)); 
          // this.lineChart.update(); 
        });  
    }); 
    
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

    // var speedCanvas = document.getElementById("speedChart");

    // var dataFirst = {
    //   data: this.dataTemp,
    //   fill: false,
    //   borderColor: '#f17e5d',
    //   backgroundColor: 'transparent',
    //   pointBorderColor: 'transparent',
    //   pointRadius: 4,
    //   pointHoverRadius: 4,
    //   pointBorderWidth: 8,
    // };

    // var dataSecond = {
    //   data: this.dataHum,
    //   fill: false,
    //   borderColor: '#51CACF',
    //   backgroundColor: 'transparent',
    //   pointBorderColor: 'transparent',
    //   pointRadius: 4,
    //   pointHoverRadius: 4,
    //   pointBorderWidth: 8
    // };

    // var speedData = {
    //   labels: this.dateTime,
    //   datasets: [dataFirst, dataSecond]
    // };

    // var chartOptions = {
    //   legend: {
    //     display: false,
    //     position: 'top'
    //   }
    // };

    // this.lineChart = new Chart(speedCanvas, {
    //   type: 'line',
    //   hover: false,
    //   data: speedData,
    //   options: chartOptions
    // });
  }
}
