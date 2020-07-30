import { Injectable, OnInit } from "@angular/core";
import { EventService   } from "./event-service.service";
import { UserProgress } from "../Models/user-progress/user-progress";

@Injectable({
  providedIn: "root",
})
export class DataService  implements OnInit {
  userProgress = new Array<UserProgress>();
  constructor(private eventServ: EventService ) {  this.getUsersProgress();}
  ngOnInit(): void {
  
  }

  getUsersProgress() {
    let up = new UserProgress();
    up.progress = 50;
    up.taskId = 1;
    up.taskName = "Angular 8 Complete course";
    up.userId = 1;
    up.userName = "Wael Dawoud";
    up.totaltasks=2;
    this.userProgress.push(up);

    up = new UserProgress();
    up.progress = 70;
    up.taskId = 2;
    up.taskName = "Spark for Data Analysis in Scala";
    up.userId = 2;
    up.userName = "Will Newell";
    up.totaltasks=2;
    this.userProgress.push(up);

    up = new UserProgress();
    up.progress = 100;
    up.taskId = 3;
    up.taskName = "Spring Boot 2.xx course";
    up.userId = 3;
    up.userName = "Jian Qiu ";
    up.totaltasks=1;
    this.userProgress.push(up);

    up = new UserProgress();
    up.progress = 43;
    up.taskId = 4;
    up.taskName = "AWS Cognitio Integration course";
    up.userId = 4;
    up.userName = "Sharjeel Chaudhry ";
    up.totaltasks=1;
    this.userProgress.push(up);

    up = new UserProgress();
    up.progress = 10;
    up.taskId = 5;
    up.taskName = "Spring in Action 5th Edition ";
    up.userId = 5;
    up.userName = "Christina Ochsner ";
    up.totaltasks=1;
    this.userProgress.push(up);

    up = null;
  }
}
