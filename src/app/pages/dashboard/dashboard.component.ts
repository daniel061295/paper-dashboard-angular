import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

import { DatosService } from './services/datos.service';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  response: any;
  public data: any[] = [];
  public dateTime: any[] = [];
  constructor( private service: DatosService){}

  datosCartas: Object;
  ngOnInit(): void {
    console.log(this);
    this.service.getLastServ().subscribe( (result) =>{
      this.response = result;
      
      // if(this.response!=null){
      //   for(let i=0; i<this.response.length ;i++){
      //     console.log(this.response[i]);
      //     this.data.push(this.response[i].data);
      //     this.dateTime.push(this.response[i].dateTime);
          
      //   }
      // }
  });


    this.datosCartas = [
      {
        titulo: "Temperatura promedio",
        valor: "25°C",
        icono: "nc-globe",
        colorIcono: "text-warning"
      },
      {
        titulo: "Temperatura maxima",
        valor: "28°C",
        icono: "nc-money-coins",
        colorIcono: "text-success"
      },
      {
        titulo: "Humedad promedio",
        valor: "80%",
        icono: "nc-vector",
        colorIcono: "text-danger"
      },
      {
        titulo: "Humedad maxima",
        valor: "89%",
        icono: "nc-favourite-28",
        colorIcono: "text-primary"
      },

    ]

    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");


    this.chartHours = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.dateTime,
        datasets: [
          {
            borderColor: "#f17e5d",
            backgroundColor: "transparent",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: this.data,
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
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
              drawBorder: false,
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
    

    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: '#f17e5d',
      backgroundColor: 'transparent',
      pointBorderColor: '#f17e5d',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }
}
