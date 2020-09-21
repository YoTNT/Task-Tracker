import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AuthService } from "src/app/Services/authService.service";
import { ReportService } from "src/app/Services/report.service";
import { Task } from "src/app/Models/task";
import { ChatService } from "src/app/Services/chat.service";
import { forkJoin, Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  loggedin: boolean = true; // to get this value form Auth service
  public currentDate: any = moment().format("ddd, MMM D, YYYY");
  public currentTime: any = moment().format("hh:mm:ss a");
  TodayTasks: Task[] = new Array();
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public auth: AuthService,
    public chatService: ChatService,
    public db: AngularFirestore,
    private report: ReportService
  ) {
    this.report.getTasksToday().then((resolve) => {
      this.TodayTasks = resolve;
      console.log("getTasksToday resolve", this.TodayTasks);
    });
    setInterval(() => {
      this.currentTime = moment().format("hh:mm:ss a");
      //this.currentDate= moment().format("MM-DD-YYYY");
      //   console.log(this.currentDateTime);
    }, 1000);
    // this.auth.redirectAuthorizeUser();
    // console.log("AppComponent", this.auth.CurrentUser)
  }

  ngOnInit(): void {
    console.log("arrived on home page");
    //if logged in then checkOrCreateUserInFirebase() else openlogin
    // this.openlogin();
    if (this.auth.isLoggedIn() == true) {
      this.checkOrCreateUserInFirebase();
    }
  }

  openlogin() {
    this.navCtrl.navigateRoot("login");

    //console.log("openlogin")
  }

  checkOrCreateUserInFirebase() {
    try {
      //for checking if users exists in firebase collection "usersTaskTracker"
      let userObservable = this.chatService.findUser(
        this.auth.getLoggedUser().email
      );
      forkJoin(userObservable).subscribe((res) => {
        for (let data of res) {
          if (data.length > 0) {
            // console.log("found an existing user with this user id ="+data[0].id);
            // this.chatService.currentUserIdFromFirebase = data[0].id;
            this.chatService.currentUserIdFromFirebaseSetFromHomePage =
              data[0].id;
            console.log(
              this.chatService.currentUserIdFromFirebaseSetFromHomePage
            );
            // localStorage.setItem(data[0].id, "userIdFirebase");
            localStorage.setItem(
              "clientIdFirebase",
              JSON.stringify(data[0].id)
            );
            // this.groupId = data[0].id;
            // this.router.navigateByUrl(`/chat/${this.groupId}`);
          } else {
            //User not found in firebase collection "usersTaskTracker"--creating the user
            console.log("user not found in firebase--in create user section");
            this.db.collection("usersTaskTracker").add({
              email: this.auth.getLoggedUser().email,
              userId: this.auth.getLoggedUser().userId,
              userName: this.auth.getLoggedUser().userName,
              avatar: this.auth.getLoggedUser().avatar,
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
