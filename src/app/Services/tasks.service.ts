import { Injectable } from '@angular/core';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  myTasks: Task[] = [
    new Task(
      't1',
      'Test 1',
      'Test Desc 1',
      0.5
    ),
    new Task(
      't2',
      'Test 2',
      'Test Desc 2',
      0.25
    ),
    new Task(
      't3',
      'Test 3',
      'Test Desc 3',
      0.85
    )
  ];

  getMyTasks(id: string){
    return {...this.myTasks.find(p => p.id === id)};
  }

  updateTask(task: Task){
    let index = this.myTasks.findIndex(item => item.id === task.id);
    this.myTasks[index] = task;
  }

  deleteTask(task: Task){
    let index = this.myTasks.findIndex(item => item.id === task.id);
    this.myTasks = this.myTasks.splice(index, 1);
    console.log(this.myTasks);
  }

  constructor() { }
}
