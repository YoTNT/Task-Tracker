import { Injectable, ErrorHandler } from "@angular/core";
import { Task } from "../Models/task";
import { HttpClient } from "@angular/common/http";
import { map, tap, take, switchMap, catchError } from "rxjs/operators";
import { BehaviorSubject, of, throwError } from "rxjs";
import { User } from '../Models/user';

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
  // myTasks: Task[] = [
  //   new Task(
  //     't1',
  //     'Test 1',
  //     'Test Desc 1',
  //     0.5
  //   ),
  //   new Task(
  //     't2',
  //     'Test 2',
  //     'Test Desc 2',
  //     0.25
  //   ),
  //   new Task(
  //     't3',
  //     'Test 3',
  //     'Test Desc 3',
  //     0.85
  //   )
  // ];

  private _myTasks = new BehaviorSubject<Task[]>([]);
  loginedUser = new User(
    '0',
    'Testing User'
  );

  get myTasks() {
    return this._myTasks.asObservable();
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
                  resData[key].id,
                  resData[key].task,
                  resData[key].details,
                  parseFloat(resData[key].progress) * 0.01,
                  resData[key].taskdate
                )
              );
            }
          }
          return tasks.sort((a, b) =>Date.parse(b.taskdate)  - Date.parse(a.taskdate)) ; // order by date DESC
        }),
        tap((tasks) => {
          this._myTasks.next(tasks)
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
            id,
            taskData.task,
            taskData.details,
            parseFloat(taskData.progress) * 0.01,
            taskData.taskdate
          );
        })
      );
  }

  getMyTasks(id: string) {
    // return {...this.myTasks.find(p => p.id === id)};
  }

  updateTask(task: Task) {
    // let index = this.myTasks.findIndex(item => item.id === task.id);
    // this.myTasks[index] = task;
    console.log("Receiving update task: ", task);
    const taskId = task.id;
    const taskName = task.taskName;
    const taskDesc = task.taskDesc;
    const taskProgress = task.progress;

    let updatedTasks: Task[];

    console.log("Start updating the task with ID: ", taskId);

    return this.myTasks.pipe(
      take(1),
      switchMap(tasks => {
        if (!tasks || tasks.length <= 0) {
          console.log("The list is empty");
          return this.fetchMyTasks(this.loginedUser.userId); // TODO: This userId must be gotten from user service later
        } else {
          return of(tasks);
        }
      }),
      switchMap(tasks => {
        console.log("Start mapping obejct between task and")
          const updatedTaskIndex = tasks.findIndex((tk) => tk.id === taskId);
          updatedTasks = [...tasks];
          const oldTask = updatedTasks[updatedTaskIndex];
          updatedTasks[updatedTaskIndex] = new Task(
            oldTask.id,
            taskName,
            taskDesc,
            taskProgress,
            new Date().toString()
          );
          console.log("Sending update request to the server: ", updatedTasks[updatedTaskIndex]);
          return this.httpClient.put(
                    `https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task`,
                    { ...updatedTasks[updatedTaskIndex] }
                  );
      }),
      tap(() => {
        console.log("Updating Reqeust Completed!");
        this._myTasks.next(updatedTasks);
      })
    );
  }

  deleteTask(taskId: string) {
    let taskTemp = Object.create(Task);
    taskTemp.id = taskId;

    console.log("Sending delete request to server with task ID: ", taskTemp.id);

    return this.httpClient
      .delete(
        "https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta/task",
       taskTemp
      )
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        }),
        switchMap(() => {
          return this.myTasks;
        }),
        take(1),
        tap(tasks => {
          this._myTasks.next(tasks.filter((t) => t.id !== taskId));
        })
      );
  }

  constructor(private httpClient: HttpClient) {}
}
