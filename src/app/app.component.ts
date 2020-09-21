import { Component, ViewChildren, QueryList } from "@angular/core";
import {
  Platform,
  NavController,
  MenuController,
  ModalController,
  IonRouterOutlet,
  ActionSheetController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./Services/authService.service";
import { User } from "./Models/user";
import { Router } from "@angular/router";
import { CreateTaskPage } from "./Pages/create-task/create-task.page";
import { ToastController } from "@ionic/angular";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser/ngx";
import { ThemeService } from "./Services/theme-service.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  loggedin: boolean = true; // to get this value form Auth service
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  Email: string;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    // private router: ActivatedRoute,
    // private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    private menuCtr: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtr: ToastController,
    private iab: InAppBrowser,
    private themeServ: ThemeService
  ) {
    this.initializeApp();
    // this.backButtonEvent();
    //console.log("AppComponent constructor");
    this.Email = auth.getLoggedUser()?auth.getLoggedUser().email:'';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes", //Windows only
  };
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
  openTeamProgress() {
    window.location.replace("tasktracker/team-progress");
    //this.navCtrl.navigateRoot("tasktracker/team-progress");
  }
  openWebSiteApp() {
    let url: string = `http://taskapp-lti.s3-website.us-east-2.amazonaws.com/home`;
    this.openWithInAppBrowser(url);
  }
  public openWithSystemBrowser(url: string) {
    let target = "_system";
    this.iab.create(url, target, this.options);
  }
  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.iab.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    let target = "_self";
    this.iab.create(url, target, this.options);
  }
  changeTheme(e) {
    console.log(e.target.checked);
    e.target.checked
      ? this.enableLightTheme()
      : this.themeServ.enableDarkMode(); 
  }
  enableDarkTheme() {}
  enableLightTheme() {
    this.themeServ.enableLightMode();
  }
  openNewTaskModal() {
    this.modalCtrl
      .create({
        component: CreateTaskPage,
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        this.navCtrl.navigateRoot(["tasktracker/mytasks"]);
        console.log("ResultData: ", resultData);
      });
    this.closeMenu();
  }
  openlogin() {
    this.navCtrl.navigateRoot("tasktracker/login");

    //console.log("openlogin")
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      // close popover
      // try {
      //   const element = await this.popoverCtrl.getTop();
      //   if (element) {
      //     element.dismiss();
      //     return;
      //   }
      // } catch (error) {}

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      // close side menua
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
          return;
        }
      } catch (error) {}

      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === "/home") {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            // this.platform.exitApp(); // Exit from app
            navigator["app"].exitApp(); // work for ionic 4
          } else {
            const toast = await this.toastCtr.create({
              header: "Info",
              message: "Your settings have been saved.",
              duration: 2000,
              position: "middle",
              buttons: [
                {
                  side: "start",
                  icon: "star",
                  text: "Favorite",
                  handler: () => {
                    console.log("Favorite clicked");
                  },
                },
                {
                  text: "Done",
                  role: "cancel",
                  handler: () => {
                    console.log("Cancel clicked");
                  },
                },
              ],
            });
            toast.present();

            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
}
