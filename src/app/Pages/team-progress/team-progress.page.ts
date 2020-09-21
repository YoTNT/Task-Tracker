import { Component, HostListener } from "@angular/core";
import { UserProgress } from "src/app/Models/user-progress";
import { Task } from "src/app/Models/task";
import { User } from "src/app/Models/user";
import { TaskProgressService } from "src/app/Services/task-progress-service.service";
import { ReportService } from "src/app/Services/report.service";
import { UsersService } from "src/app/Services/users.service";
import { TasksService } from "src/app/Services/tasks.service";
import { AuthService } from "src/app/Services/authService.service";
import { ModalController, NavController } from '@ionic/angular';
import { CreateTaskPage } from '../create-task/create-task.page';
@Component({
  selector: "app-team-progress",
  templateUrl: "team-progress.page.html",
  styleUrls: ["team-progress.page.scss"],
})
export class TeamProgressPage {
  userProgress = new Array<UserProgress>();
  tasks: Task[] = new Array();
  users: User[] = new Array();
  user: User = new User();
  constructor(
    private datasev: TaskProgressService,
    private repServ: ReportService,
    public usrServ: UsersService,
    private taskServ: TasksService,
    public auth: AuthService,
    private modalCtrl: ModalController, 
    private navCtrl: NavController,
  ) {
    this.getUserProgress();
  }
  isLoaded: boolean = false;
  ngOnInit() {
    this.user = this.auth.getLoggedUser();
    //  this.isLoaded = true;
    //  this.getTotalUserTasks();
  }
  // ionViewWillLeave() {}
  // ionViewDidLeave() {}
  // ionViewDidEnter() {}

  ionViewWillEnter() {
    this.getUserProgress();
  }

  getUserProgress() {
    //  if (!this.isLoaded) {

    //Get All Users
    this.users = this.usrServ.usersList;
    let userProgAr = new Array<UserProgress>();
    let tasksGroupByUsr = new Array<Array<Task>>();
    this.repServ.getTasks().subscribe((data) => {
      // console.log("ionViewWillEnter this.tasks", data);

      tasksGroupByUsr = data.reduce((r, a) => {
        r[a.userid] = r[a.userid] || [];
        r[a.userid].push(a);
        return r;
      }, Object.create(null));

      new Promise((resolve) => {
        resolve(tasksGroupByUsr);
      })
        .then((res) => {
          // console.log("Array<Array<Task>> ", res);

          return Array.of(res);
        })
        .then((res) => {
          let taskid = "";
          // Iterate over the grouped Array by  group by value :
          for (let id of Object.keys(res[0])) {
            if (id) {
              let up: UserProgress = new UserProgress();
              let totaltasks: number = 0;
              let totalInProgress: number = 0;
              let totalInCompeletd: number = 0;
              let avgProgress: number = 0;
              let taskid = "";
              up.userId = id;
              up.userName = this.users.find((x) => x.userId == id).userName;
              let val = res[0][id];
              // console.log("userid, val", id, val);
              //Get the Task Object from the arry
              for (let tid of Object.keys(val)) {
                totaltasks++;
                let percentage = 0;
                percentage = this.parsPercentage(val[tid].progress);
                let val2 = val[tid].task;
                if (percentage < 100) {
                  // console.log(
                  //   "if (percentage < 100) ",
                  //   percentage,
                  //   percentage < 100
                  // );

                  avgProgress = percentage + avgProgress;
                  taskid = val[tid].id;
                  totalInProgress++;
                  // console.log(" totalInProgress++", totalInProgress, id);
                } else if (percentage >= 100) ++totalInCompeletd;

                // console.log("tid, val2", tid, val2);
              }
              up.totaltasks = totaltasks;
              up.totalInCompeletd = totalInCompeletd;
              up.totalInProgress = totalInProgress;
              if (avgProgress > 0 && totalInProgress > 0) {
                let avg = avgProgress / totalInProgress;
                up.avgProgress = Number(avg.toFixed(2)); //round the number
              }

              userProgAr.push(up);
            }
          }
          this.userProgress = userProgAr;
        });

      //Group the Tasks By User ID
    });
    //console.log("userProgAr", userProgAr);
    this.isLoaded = false;
    //  return userProgAr;
    // }
  }

  parsPercentage(val): number {
    //  console.log("val", val);
    let progress = (parseFloat(val) > 1
      ? parseFloat(val)
      : parseFloat(val) * 100
    ).toFixed(0);
    // console.log("progress", progress);

    return Number(
      (parseFloat(val) > 1 ? parseFloat(val) : parseFloat(val) * 100).toFixed(0)
    );
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
  
  }
  async doRefresh(e) {
    await new Promise(() => {
      this.isLoaded = true;
      setTimeout(() => {
        this.ionViewWillEnter();
        e.target.complete();
        this.isLoaded = false;
      }, 1500);
    }).catch((error) => error);
  }
}
