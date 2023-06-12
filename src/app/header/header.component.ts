import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { VehicleService } from '../services/vehicle.service';
import { VehicleAddUpdateComponent } from '../vechile-add-update/vehicle-add-update.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog,
    private _vehicleService: VehicleService,
  ) { }



  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(VehicleAddUpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehicleInfo();
        }
      },
    });
  }

  getVehicleInfo() {
    this._vehicleService.getVehicleInfo().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }
}
