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
  storedData: any;
  totalVehiclesCount: number;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private _vehicleService: VehicleService) {
    this.totalVehiclesCount = 0
  }

  ngOnInit(): void {
    this.getVehicleInfo()
  }


  getVehicleInfo() {
    this._vehicleService.getVehicleInfo().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(res);
        this.storedData = res;
      }

    });
  }
  calculateTotalVehiclesCount() {

    for (const data of this.storedData) {
      const vehicleType = data.vehicleType;
      if (vehicleType && vehicleType.trim() !== '') {
        this.totalVehiclesCount++;
      }
    }

    console.log(this.totalVehiclesCount);
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
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [{
      data: [300, 500, 100]
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

}
