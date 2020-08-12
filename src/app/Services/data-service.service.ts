import { Injectable, OnInit } from "@angular/core";
import { EventService } from "./event-service.service";
import { UserProgress } from "../Models/user-progress";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService implements OnInit {
  userProgress = new Array<UserProgress>();
  constructor(private eventServ: EventService) {
    this.getUsersProgress();
  }
  ngOnInit(): void {}

  getUsersProgress() {
    let up = new UserProgress();
    up.avgProgress = 50;
    // up.taskId = 1;
    // up.taskName = "Angular 8 Complete course";
    up.userId = 1;
    up.userName = "Wael Dawoud";
    up.totaltasks = 2;
    this.userProgress.push(up);
    

    up = null;
  }
  getUserTasks(userid: number): Array<any> {
    let arr = this.userProgress.filter((x) => x.userId === userid);
    return arr;
  }
}
