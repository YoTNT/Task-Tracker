import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../Models/task';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TasksService } from 'src/app/Services/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detial',
  templateUrl: './task-detial.page.html',
  styleUrls: ['./task-detial.page.scss'],
})
export class TaskDetialPage implements OnInit {

  loadedTask = Object.create(Task); // Variable need to be initialized!!!
  taskSub: Subscription;

  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private tasksService: TasksService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('taskId')){
        this.navCtrl.navigateBack('/tasktracker/mytasks');
        return;
      }
																				 
      this.taskSub = this.tasksService.getTask(paramMap.get('taskId')).subscribe(task =>{
        console.log("Subscripting: ", task);
        this.loadedTask = task;
        console.log("This.loadedTask.id = ", this.loadedTask.id);
      });
    })
  }

  updateTask(){
    console.log("The task is going to be updated with data: ", this.loadedTask);
    this.tasksService.updateTask(this.loadedTask).subscribe();
  }

  deleteTask(){
    console.log("Trying to delete task with ID: ", this.loadedTask.id);
    this.tasksService.deleteTask(this.loadedTask).subscribe();
    this.navCtrl.navigateBack("/tasktracker/mytasks");
    return;
  }

  onViewWillEnter(){
    this.tasksService.fetchMyTasks(this.tasksService.loginedUser.userId);
  }

  onViewWillLeave(){
    this.tasksService.updateTask(this.loadedTask);
  }
 

  ngOnDestroy(){
    if(this.taskSub){
      this.taskSub.unsubscribe();
    }
  }
}