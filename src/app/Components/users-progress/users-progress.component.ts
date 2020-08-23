import { Component, OnInit } from "@angular/core";
import { UserProgress } from "src/app/Models/user-progress";
import { TaskProgressService } from "src/app/Services/task-progress-service.service";
import { PopoverController } from "@ionic/angular";
import { UserTasksPage } from "../../Pages/user-tasks/user-tasks.page";
import { Task } from "src/app/Models/task";
import { ReportService } from "src/app/Services/report.service";
import { User } from "src/app/Models/user";
import { UsersService } from "src/app/Services/users.service";
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: "app-team-progress",
  templateUrl: "./users-progress.component.html",
  styleUrls: ["./users-progress.component.scss"],
})
export class UsersProgressComponent implements OnInit {
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
    });
    //Get All Users
    this.users = this.usrServ.usersList;
    this.doRefresh(undefined)
  }
  isLoaded: boolean = false;
  ngOnInit() {
    this.doRefresh(undefined)
    //  this.isLoaded = true;
    //  this.getTotalUserTasks();
  }
  ionViewWillLeave() {
   
  }
  ionViewDisLeave() {
  
  }
  ionViewDidEnter() {}
  ionViewWillEnter() {
    this.userProgress = this.getUserProgress();
  }

  getUserProgress(): Array<UserProgress> {
    //  if (!this.isLoaded) {
    let userProgAr = new Array<UserProgress>();
    console.log("ionViewWillEnter this.tasks", this.tasks);

    //Group Tasks By   getTotalUserTasks() {User ID
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
          up.avgProgress = avgProgress;
          userProgAr.push(up);
        }
      });
    console.log("userProgAr", userProgAr);
    this.isLoaded = false;
    return userProgAr;
    // }
  }

  parsPercentage(val): number {
    return parseFloat(val) > 1 ? parseFloat(val) : parseFloat(val) * 100;
  }

  async doRefresh(event) {
    this.isLoaded = true;
    await new Promise(() => {
      event.target ? (event.target.disabled = true) : false;
      setTimeout(() => {
        this.ionViewWillEnter();
        event.target ? (event.target.disabled = false) : true;
        this.isLoaded = false;  }, 1500);
   }).catch((error) => error);
  }
}
