import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
  }

  ngAfterViewInit() {
    this.spinner.hide();
  }

  ngOnDestroy() {
    this.spinner.hide();
  }

}
