import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/user-progress/task';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-task-detial',
  templateUrl: './task-detial.page.html',
  styleUrls: ['./task-detial.page.scss'],
})
export class TaskDetialPage implements OnInit {

  loadedTask: Task;

  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private tasksService: TasksService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('taskId')){
        this.navCtrl.navigateBack('/tabs/tab3');
        return;
      }
      this.loadedTask = this.tasksService.getMyTasks(paramMap.get('taskId'));
    })
  }

  updateTask(){
    this.tasksService.updateTask(this.loadedTask);
  }

  deleteTask(){
    this.tasksService.deleteTask(this.loadedTask);
    this.navCtrl.navigateBack("/tabs/tab3");
    return;
  }

  onViewWillLeave(){
    this.tasksService.updateTask(this.loadedTask);
  }
}
