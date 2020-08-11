import { Component, OnInit } from '@angular/core';
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

  loadedTask: Task;
  taskSub: Subscription;

  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private tasksService: TasksService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('taskId')){
        this.navCtrl.navigateBack('/tasktracker/submit-my-progress');
        return;
      }
      console.log("Entering detail page with task ID: ", paramMap.get('taskId'));
      // *** This code is loading data locally. ***
      // *** Its purpose is for testing the UI  ***
      // ********************************************************************
      this.tasksService.myTasks.subscribe(tasks => {
        this.loadedTask = tasks.find(t => t.id === paramMap.get('taskId'));
        console.log("Getting data locally with task: ", this.loadedTask);
      })
      // ********************************************************************

      // TODO: This code need to be active using API
      // this.taskSub = this.tasksService.getTask(paramMap.get('taskId')).subscribe(task =>{
      //   this.loadedTask = task;
      // });


      // Old code
      // this.loadedTask = this.tasksService.getMyTasks(paramMap.get('taskId'));
    })
  }

  updateTask(){
    this.tasksService.updateTask(this.loadedTask);
  }

  deleteTask(){
    this.tasksService.deleteTask(this.loadedTask.id);
    this.navCtrl.navigateBack("/tabs/tab3");
    return;
  }

  // Update MyTask list from API
  onViewWillEnter(){
    this.tasksService.fetchMyTasks('test');
  }

  onViewWillLeave(){
    this.tasksService.updateTask(this.loadedTask);
  }
}
