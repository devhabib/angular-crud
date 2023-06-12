import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormComponent } from '../../main/form/form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(FormComponent);
  }
}
