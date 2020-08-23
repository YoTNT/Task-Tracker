import { Component, HostListener } from "@angular/core";
import { UserProgress } from "src/app/Models/user-progress";
import { Task } from "src/app/Models/task";
import { User } from "src/app/Models/user";
import { TaskProgressService } from "src/app/Services/task-progress-service.service";
import { ReportService } from "src/app/Services/report.service";
import { UsersService } from "src/app/Services/users.service";
import { TasksService } from "src/app/Services/tasks.service";

@Component({
  selector: "app-team-progress",
  templateUrl: "team-progress.page.html",
  styleUrls: ["team-progress.page.scss"],
})
export class TeamProgressPage {
  userProgress = new Array<UserProgress>();
  tasks: Task[] = new Array();
  users: User[] = new Array();

  constructor(
    private datasev: TaskProgressService,
    private repServ: ReportService,
    private usrServ: UsersService,
    private taskServ: TasksService
  ) {
    this.repServ.getTasks().subscribe((data) => {
      this.tasks = data;
      this.userProgress = this.getUserProgress();
    });
    //Get All Users
    this.users = this.usrServ.usersList;
  }
  isLoaded: boolean = false;
  ngOnInit() {
 
  this.doRefresh(undefined);
    //  this.isLoaded = true;
    //  this.getTotalUserTasks();
  }
  // ionViewWillLeave() {}
  // ionViewDidLeave() {}
  // ionViewDidEnter() {}

  ionViewWillEnter() {
  // this.userProgress = this.getUserProgress();
  }

  getUserProgress(): Array<UserProgress> {
    //  if (!this.isLoaded) {
    let userProgAr = new Array<UserProgress>();
    console.log("ionViewWillEnter this.tasks", this.tasks);

    //Group the Tasks By User ID
    let tasksGroupByUsr = new Array<Array<Task>>();
    tasksGroupByUsr = this.tasks.reduce((r, a) => {
      r[a.userid] = r[a.userid] || [];
      r[a.userid].push(a);
      return r;
    }, Object.create(null));

    let prom = new Promise((resolve) => {
      resolve(tasksGroupByUsr);
    })
      .then((res) => {
        console.log("Array<Array<Task>> ", res);

        return Array.of(res);
      })
      .then((res) => {
        let up: UserProgress;
        let totaltasks, totalInProgress, totalInCompeletd, avgProgress: number;
        // Iterate over the grouped Array by  group by value :
        for (let id of Object.keys(res[0])) {
          up = new UserProgress();
          totaltasks = totalInProgress = totalInCompeletd = avgProgress = 0;
          up.userId = id;
          up.userName = this.users.find((x) => x.userId == id).userName;
          let val = res[0][id];
          console.log("id, val", id, val);
          //Get the Task Object from the arry
          for (let tid of Object.keys(val)) {
            ++totaltasks;
            let percentage = this.parsPercentage(val[tid].progress);
            let val2 = val[tid].task;
            if (percentage < 100) {
              avgProgress += percentage;
              ++totalInProgress;
            }
            if (percentage >= 100) ++totalInCompeletd;

            console.log("tid, val2", tid, val2);
          }
          up.totaltasks = totaltasks;
          up.totalInCompeletd = totalInCompeletd;
          up.totalInProgress = totalInProgress;
          if (avgProgress > 0 && totalInProgress > 0)
            avgProgress = avgProgress / totalInProgress;
          up.avgProgress = Number(avgProgress.toFixed(2)); //round the number
          userProgAr.push(up);
        }
      });
    console.log("userProgAr", userProgAr);
    this.isLoaded = false;
    return userProgAr;
    // }
  }

  parsPercentage(val): number {
    return Number(
      (parseFloat(val) >= 1 ? parseFloat(val) : parseFloat(val) * 100).toFixed(
        0
      )
    );
  }

  async doRefresh(event) {
    this.isLoaded = true;
    await new Promise(() => {
      event.target ? (event.target.disabled = true) : false;
      setTimeout(() => {
        this.ionViewWillEnter();
        event.target ? (event.target.disabled = false) : true;
        this.isLoaded = false;
      }, 1500);
    }).catch((error) => error);
  }
}
