import { Component } from "@angular/core";
import { Platform, NavController, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./Services/authService.service";
import { User } from "./Models/user";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  loggedin: boolean = true; // to get this value form Auth service

  constructor(
    // private router: ActivatedRoute,
    // private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private menuCtr: MenuController
  ) {
    this.initializeApp();
    //console.log("AppComponent constructor");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    if (this.getIsLogged()) {
      this.auth.logOut();
      this.auth.userChange.emit(new User());
      this.closeMenu();
    }
    // console.log("logout" , this.getIsLogged())
    // if (this.getIsLogged()) this.authServ.userLogout();
    // else return;
  }
  getIsLogged(): boolean {
    return this.auth.isLoggedIn();
  }
  async closeMenu() {
    await this.menuCtr.toggle();
  }
  openMenu() {
    this.menuCtr.enable(true, "main-menu");
    this.menuCtr.open("main-menu");
  }
}
