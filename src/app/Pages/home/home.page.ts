import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  loggedin: boolean = true; // to get this value form Auth service
  public currentDate : any = moment().format("ddd, MMM D, YYYY");
  public currentTime: any = moment().format("hh:mm:ss a");
  constructor(private router:Router ,  private navCtrl: NavController,) {
    setInterval(() => {
      this.currentTime = moment().format("hh:mm:ss a");
      //this.currentDate= moment().format("MM-DD-YYYY");
      //   console.log(this.currentDateTime);
    }, 1000);
    // this.auth.redirectAuthorizeUser();
    // console.log("AppComponent", this.auth.CurrentUser)
  }
  ngOnInit(): void {
 
  }

  openlogin()
  {
    this.navCtrl.navigateRoot("login");
   
    console.log("openlogin")
  }
}
