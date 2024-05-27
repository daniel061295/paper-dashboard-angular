import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  
  datosCartas:Object;
    ngOnInit(){
      this.datosCartas = [
        {
          titulo     : "Capacity",
          valor      : "150GB",
          icono      : "nc-globe",
          colorIcono : "text-warning"
        },
        {
          titulo     : "Capacity",
          valor      : "150GB",
          icono      : "nc-globe",
          colorIcono : "text-warning"
        },
        {
          titulo     : "Capacity",
          valor      : "150GB",
          icono      : "nc-globe",
          colorIcono : "text-warning"
        },
        {
          titulo     : "Capacity",
          valor      : "150GB",
          icono      : "nc-globe",
          colorIcono : "text-warning"
        }
      ]

      
      this.chartColor = "#FFFFFF";
      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
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
