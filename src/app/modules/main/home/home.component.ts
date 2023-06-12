import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.getApiData()
  }

  getApiData() {
    this._api.getData().subscribe({
      next: (res) => {
        console.log(res)
      },
      error: console.log,
    });
  }
}
