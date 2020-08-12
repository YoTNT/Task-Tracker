import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from '../../Models/task';
import { TasksService } from '../../Services/tasks.service';
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
  isLoading = false;
  constructor(private tasksService: TasksService, private router: Router) {}

  ngOnInit(){
    this.taskSub = this.tasksService.myTasks.subscribe(tasks => {
      this.loadedTasks = tasks;
    });
  }

  ionViewWillEnter(){
    // this.loadedTasks = this.tasksService.myTasks;

    this.isLoading = true;

    // Testing
    // TODO: Need to pass the right userId into fetchMyTasks
    this.tasksService.fetchMyTasks(this.tasksService.loginedUser.userId).subscribe(() => {
      this.isLoading = false;
    }); // Access API
  }


  onEdit(taskId: string, slidingItem: IonItemSliding){
    console.log("Getting into onEdit");
    console.log("Tast ID is: ", taskId);
    slidingItem.close();
    this.router.navigate(['/', 'tasktracker', 'submit-my-progress', taskId]);
  }

  onDelete(task: Task, slidingItem: IonItemSliding){
    slidingItem.close();
    this.tasksService.deleteTask(task.id);
  }

  ngOnDestroy(){
    if(this.taskSub){
      this.taskSub.unsubscribe();
    }
  }
}
