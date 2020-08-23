import { Injectable, ErrorHandler } from "@angular/core";
import { Task } from "../Models/task";
import { HttpClient } from "@angular/common/http";
import { map, tap, take, switchMap, catchError } from "rxjs/operators";
import { BehaviorSubject, of, throwError, Observable } from "rxjs";
import { User } from "../Models/user";
import { AuthService } from "./authService.service";
import { Router } from "@angular/router";

interface TaskData {
  task: string;
  details: string;
  id: string;
  taskdate: string;
  userid: string;
  progress: string;
}

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private _myTasks = new BehaviorSubject<Task[]>([]);
  loginedUser = new User();

  path: string = "https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta";
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    /*
    //::Wael::this is  corect way , the validtion forced the app to go back home 
     in all other forms used this service and does not require login*/
    this.loginedUser = this.auth.getLoggedUser();
  }
  get myTasks() {
    return this._myTasks.asObservable();
  }
  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.path}/task/`);
  }
  // API Access // Get all user tasks
  fetchMyTasks(userId: string) {
    // For now, fetch all the task for the userId 0
    // TODO: change API later
    return this.httpClient
      .get<{ [key: string]: TaskData }>(
        `https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task/?userid=${userId}`
      )
      .pipe(
        map((resData) => {
          const tasks = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              tasks.push(
                new Task(
                  resData[key].task,
                  resData[key].id,
                  resData[key].taskdate,
                  resData[key].details,
                  resData[key].userid,
                  parseFloat(resData[key].progress) > 1
                    ? parseFloat(resData[key].progress) * 0.01
                    : parseFloat(resData[key].progress)
                )
              );
            }
          }
          return tasks.sort(
            (a, b) => Date.parse(b.taskdate) - Date.parse(a.taskdate)
          ); // order by date DESC
        }),
        tap((tasks) => {
          this._myTasks.next(tasks);
        })
      );
  }

  getTask(id: string) {
    return this.httpClient
      .get<TaskData>(
        `https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task/?taskid=${id}`
      )
      .pipe(
        map((taskData) => {
          return new Task(
            taskData.task,
            id,
            taskData.taskdate,
            taskData.details,
            taskData.userid,
            parseFloat(taskData.progress)
          );
        })
      );
  }

  addTask(taskTitle: string, taskDescription: string) {
    console.log(
      "Trying to create task with title: ",
      taskTitle,
      " and description: ",
      taskDescription
    );
    const currentUserId = this.loginedUser.userId;

    const newTask = Object.create(Task);
    newTask.task = taskTitle;
    newTask.id = null;
    newTask.taskdate = new Date().toISOString().substring(0, 10);
    newTask.details = taskDescription;
    newTask.userid = currentUserId;
    newTask.progress = "0";

    console.log("Create new task target: ", newTask);

    return this.httpClient
      .post<{ taskid: string }>(
        "https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task",
        newTask
      )
      .pipe(
        switchMap((resData) => {
          newTask.id = resData.taskid;
          return this.myTasks;
        }),
        take(1),
        tap((tasks) => {
          this._myTasks.next(tasks.concat(newTask));
        })
      );
  }

  updateTask(task: Task) {
    // let index = this.myTasks.findIndex(item => item.id === task.id);
    // this.myTasks[index] = task;
    console.log("Receiving update task: ", task);
    const taskId = task.id;
    const taskName = task.task;
    const taskDesc = task.details;
    const taskProgress = task.progress;
    const taskUserId = task.userid;

    let updatedTasks: Task[];

    console.log("Start updating the task with ID: ", taskId);

    return this.myTasks.pipe(
      take(1),
      switchMap((tasks) => {
        if (!tasks || tasks.length <= 0) {
          console.log("The list is empty");
          return this.fetchMyTasks(this.loginedUser.userId); // TODO: This userId must be gotten from user service later
        } else {
          return of(tasks);
        }
      }),
      switchMap((tasks) => {
        console.log("Start mapping obejct between task and");
        const updatedTaskIndex = tasks.findIndex((tk) => tk.id === taskId);
        updatedTasks = [...tasks];
        const oldTask = updatedTasks[updatedTaskIndex];
        updatedTasks[updatedTaskIndex] = new Task(
          taskName,
          oldTask.id,
          new Date().toString(),
          taskDesc,
          taskUserId,
          taskProgress
        );
        console.log(
          "Sending update request to the server: ",
          updatedTasks[updatedTaskIndex]
        );
        return this.httpClient.put(
          `https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task`,
          // { ...updatedTasks[updatedTaskIndex] }
          task
        );
      }),
      tap(() => {
        console.log("Updating Reqeust Completed!");
        this._myTasks.next(updatedTasks);
      })
    );
  }

  deleteTask(task: Task) {
    console.log("Sending delete request to server with task ID: ", task.id);

    return this.httpClient
      .delete<any>(
        `https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task?id=${task.id}`
      )
      .pipe(
        catchError((err) => {
          console.log("Handling error locally and rethrowing it...", err);
          return throwError(err);
        }),
        switchMap(() => {
          return this.myTasks;
        }),
        take(1),
        tap((tasks) => {
          this._myTasks.next(tasks.filter((t) => t.id !== task.id));
        })
      );
  }
}
