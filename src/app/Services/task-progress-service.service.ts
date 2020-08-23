import { Injectable, OnInit } from "@angular/core";
import { UserProgress } from "../Models/user-progress";
import { TasksService } from "./tasks.service";
import { UsersService } from "./users.service";
import { User } from "../Models/user";
import { pipe, from, of, Observable } from "rxjs";
import {
  map,
  groupBy,
  mergeMap,
  reduce,
  switchMap,
  toArray,
} from "rxjs/operators";
import { Task } from "../Models/task";
import { Key } from "protractor";

@Injectable({
  providedIn: "root",
})
export class TaskProgressService implements OnInit {
  userProgressAry :Array<UserProgress> = new Array<UserProgress>();

  UsersTasks : Array<Array<Task>>= new Array<Array<Task>>();
  taskAry: Task[] = new Array();
  usersAry = new Array<User>();
  constructor(private taskServ: TasksService, private userServ: UsersService) {
   this.UsersTasks = this.getTasksGroupByUserId();
    console.log("UsersTasks Print", this.UsersTasks);

    // this.userProgressAry = this.getUsersProgress(this.UsersTasks);
    // // console.log("getAllTasks", this.taskAry);
    // console.log("this.userProgressAry", this.userProgressAry);
  }

  ngOnInit(): void {}

  
  getTasksGroupByUserId(): Array<Array<Task>> {
    let avg: number = 0;
    let counter: number = 0;
    let self = this;
    let up: UserProgress;
    let usertasksAry = new Array<Array<Task>>();
    const userstasks$ = this.taskServ
      .getAllTasks()
      .pipe(switchMap((res) => res));
    const srs$ = userstasks$.pipe(
      groupBy((t: Task) => t.userid),
      mergeMap((gr) => gr.pipe(toArray()))
    );
    srs$.subscribe((val) => {
      usertasksAry.push(val);
      //console.log("val,",val);
    });
    return usertasksAry;
  }

  parsPercentage(val): number {
    return parseFloat(val) > 1 ? parseFloat(val) * 0.01 : parseFloat(val);
  }
  getUserTasks(userid: number): Array<any> {
    let arr = this.userProgressAry.filter((x) => x.userId === userid);
    return arr;
  }
}
