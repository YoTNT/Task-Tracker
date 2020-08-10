import { Component } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from '../Models/task';
import { TasksService } from '../Services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  loadedTasks: Task[];

  constructor(private tasksService: TasksService, private router: Router) {
    this.loadedTasks = tasksService.myTasks;
  }

  onViewWillEnter(){
    this.loadedTasks = this.tasksService.myTasks;
  }


  onEdit(taskId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/', 'tasktracker', 'submit-my-progress', taskId]);
  }

  onDelete(task: Task, slidingItem: IonItemSliding){
    slidingItem.close();
    this.tasksService.deleteTask(task);
  }

}
