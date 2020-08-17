import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public currentDateTime: any = moment().format("MM-DD-YYYY HH:mm:ss");
 
  ngOnInit(): void {
  //   setInterval(() => {
  //     this.currentDateTime = moment().format("MM-DD-YYYY HH:mm:ss");
  //  //   console.log(this.currentDateTime);
  //   }, 1000);
  }

}
