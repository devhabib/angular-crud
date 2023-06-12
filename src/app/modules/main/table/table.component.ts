import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../services/core/core.service';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleAddUpdateComponent } from '../vechile-add-update/vehicle-add-update.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  displayedColumns: string[] = [
    'id',
    'ownerName',
    'vehicleType',
    'licenseNo',
    'entry',
    'status',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _vehicleService: VehicleService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getVehicleInfo();
  }
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
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteVehicle(id: number) {
    this._vehicleService.deleteVehicle(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Vehicle deleted!', 'done');
        this.getVehicleInfo();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(VehicleAddUpdateComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehicleInfo();
        }
      },
    });
  }
}