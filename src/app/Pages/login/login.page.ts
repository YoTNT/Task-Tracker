import { Component, OnInit } from "@angular/core";

import { UsersService } from "src/app/Services/users.service";

import { AuthService } from "src/app/Services/authService.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private auth: AuthService,
    private userServ: UsersService,
    private navCtr: NavController
  ) {
    if (auth.isLoggedIn()) {
      auth.redirectToHome();
    }
    this.auth.errmessage.subscribe((msg) => {
      this.message = msg;
    });
  }

  email: any;
  pass: any;
  message: any;
  messageType: any;
  loggedIn: boolean;
  loading: boolean;
  ngOnInit() {
    // this.authServ.auth.sharedUser.subscribe((user) => (this.email = user));
    // this.authServ.auth.sharedLoggedIn.subscribe(
    //   (loggedIn) => (this.loggedIn = loggedIn)
    // );
  }
  back() {
    this.navCtr.back();
  }
  async signIn() {
    this.loading = true;
    let errmessage = "";
    await new Promise(() => {
      console.log("Sign In");
      try {
        this.auth.signIn(this.email, this.pass);
      } catch (err) {
        this.loading = false;
        this.message = err;
      }
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }).catch((error) => {
      this.message = error;
      this.loading = false;
    });
  }
}
