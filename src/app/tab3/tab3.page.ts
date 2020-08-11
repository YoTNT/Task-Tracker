import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from '../Models/task';
import { TasksService } from '../Services/tasks.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy{

  loadedTasks: Task[];
  private taskSub: Subscription;

  constructor(private tasksService: TasksService, private router: Router) {}

  ngOnInit(){
    this.taskSub = this.tasksService.myTasks.subscribe(tasks => {
      this.loadedTasks = tasks;
    });
  }

  ionViewWillEnter(){
    // this.loadedTasks = this.tasksService.myTasks;

    // Testing
    this.tasksService.fetchMyTasks('test').subscribe(); // Access API
  }


  onEdit(taskId: string, slidingItem: IonItemSliding){
    console.log("Getting into onEdit");
    console.log("Tast ID is: ", taskId);
    slidingItem.close();
    this.router.navigate(['/', 'tasktracker', 'submit-my-progress', taskId]);
  }

  onDelete(task: Task, slidingItem: IonItemSliding){
    slidingItem.close();
    this.tasksService.deleteTask(task);
  }

  ngOnDestroy(){
    if(this.taskSub){
      this.taskSub.unsubscribe();
    }
  }
}
