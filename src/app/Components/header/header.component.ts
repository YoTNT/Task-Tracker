import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { AuthService } from "src/app/Services/authService.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userName: any;
  isLogged: boolean = false;
  constructor(private auth: AuthService) {
 
  }

 // public currentDateTime: any = moment().format("MM-DD-YYYY HH:mm:ss");

  ngOnInit(): void {

    
    this.auth.userChange.subscribe((user) => {
      this.userName = user != null ? "Hi,"+user.userName : "";
     // this.isLogged = user != null
    });


    
  }
  ionViewWillEnter() {
   // console.log("ionViewWillEnter", this.getIsLogged());
  }
  logout() {
    if (this.getIsLogged()) 
    {
      this.auth.logOut();
      this.userName="";
    }
    // console.log("logout" , this.getIsLogged())
    // if (this.getIsLogged()) this.authServ.userLogout();
    // else return;
  }
  getIsLogged(): boolean {
    return this.auth.isLoggedIn();
  }
}
