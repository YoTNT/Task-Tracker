import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
 
import { Task } from "src/app/Models/task";
import { ReportService } from "src/app/Services/report.service";
import { User } from "src/app/Models/user";
import { UsersService } from "src/app/Services/users.service";
 
import { AuthService } from "src/app/Services/authService.service";

@Component({
  selector: "app-today-tasks",
  templateUrl: "./today-tasks.component.html",
  styleUrls: ["./today-tasks.component.scss"],
  
})
export class TodayTasksComponent implements OnInit, AfterViewInit {
  userProgress = new Array<any>();
  tasks: Task[] = new Array();
  users: User[] = new Array();
  user: User = new User();
  @ViewChild("divMsg") divMsg: ElementRef;
  nodata: boolean = false;
  isLoaded: boolean = false;
  constructor(
    private repServ: ReportService,
    private usrServ: UsersService,
    private auth: AuthService
  ) {
    //Get All Users
    this.getUsersTodayTasks();
    this.nodata = false;
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.user = this.auth.getLoggedUser();
    // this.doRefresh();
    //  this.isLoaded = true;
    //  this.getTotalUserTasks();
    // this.userProgress = this.getUsersTodayTasks();
  }

  ionViewWillEnter() {}

  getUsersTodayTasks() {
    //  if (!this.isLoaded) {
    this.repServ.getTasksToday().then((data) => {
      this.users = this.usrServ.usersList;
      this.tasks = data;
      let userProgAr = new Array<any>();
      //  console.log("ionViewWillEnter this.tasks", this.tasks);
      console.log("Task getUsersTodayTasks", this.users);
      for (let t of this.tasks) {
        if(t.userid)
        {
        console.log("Task getUsersTodayTasks t.userid", t.userid);

        let us: User = Object.create(
          this.users.find((x) => x.userId == t.userid)
        );
        console.log("bject.create(this.users.find(x=>x.userId==t.userid))", us);

        let obj: any = {
          id: t.id,
          task: t.task,
          taskdate: t.taskdate,
          userid: t.userid,

          userName: this.users.find((u) => u.userId == t.userid).userName,
          progress: this.parsPercentage(t.progress),
        };
        //  console.log("   userProgAr.push(obj);", obj);
        userProgAr.push(obj);
      }}
      console.log("getUsersTodayTasks", userProgAr);
      this.userProgress = userProgAr;
      this.userProgress.length < 1
        ? (this.divMsg.nativeElement.style.display = "block")
        : "none";
    });

    // }
  }

  parsPercentage(val): number {
    return parseInt(val) > 1 ? parseInt(val) : parseInt(val) * 100;
  }

  async doRefresh(e) {
    // console.log("UsersProgressComponent.doRefresh started");
    await new Promise(() => {
      this.isLoaded = true;
      setTimeout(() => {
        this.getUsersTodayTasks();
        e.target.complete();
        // this.ionViewWillEnter();
        this.isLoaded = false;
      }, 1000);
    }).catch((error) => error);
  }
}
