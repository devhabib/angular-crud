import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource: any;
  storedData: any[] = [];
  totalVehiclesInParking: number = 0;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicleInfo();
  }

  getVehicleInfo() {
    this._vehicleService.getVehicleInfo().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(res);
        this.storedData = res;
        this.calculateTotalVehiclesInParking();
      }
    });
  }

  calculateTotalVehiclesInParking() {
    this.totalVehiclesInParking = this.storedData.filter((data: any) => data.status === 'in' && data.status !== '').length;
    console.log(this.totalVehiclesInParking);
    this.updateChartData();
  }

  updateChartData() {
    this.pieChartData.datasets[0].data = [this.totalVehiclesInParking, this.storedData.length - this.totalVehiclesInParking];
    if (this.chart) {
      this.chart.update();
    }
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Vehicles in Parking', 'Vehicles Outside Parking'],
    datasets: [{
      data: [this.totalVehiclesInParking, this.storedData.length - this.totalVehiclesInParking]
    }]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
}
