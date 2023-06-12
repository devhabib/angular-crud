import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-add-update',
  templateUrl: './vehicle-add-update.component.html',
  styleUrls: ['./vehicle-add-update.component.scss'],
})
export class VehicleAddUpdateComponent implements OnInit {
  empForm: FormGroup;

  vehicleNames: string[] = [
    'MicroBus',
    'Car',
    'Truck'
  ];

  constructor(
    private _fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _dialogRef: MatDialogRef<VehicleAddUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      ownerName: '',
      vehicleType: '',
      licenseNo: '',
      entry: '',
      status: '',
      address: '',
      parkingCharge: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._vehicleService
          .updateVehicle(this.data.id, this.empForm.value)
          .subscribe({
            next: () => {
              this._coreService.openSnackBar('Vehicle detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._vehicleService.addVehicle(this.empForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Vehicle added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
