import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../Models/task';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
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
    private tasksService: TasksService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('taskId')){
        this.navCtrl.navigateBack('/tasktracker/submit-my-progress');
        return;
      }

      this.taskSub = this.tasksService.getTask(paramMap.get('taskId')).subscribe(task =>{
        console.log("Subscripting: ", task);
        this.loadedTask = task;
      });
    })
  }

  updateTask(){
    console.log("The task is going to be updated with data: ", this.loadedTask);
    this.tasksService.updateTask(this.loadedTask).subscribe();
  }

  async deleteTask(){
    console.log("Trying to delete task with ID: ", this.loadedTask.id);
    
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Are you sure to delete this task?',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked.');
          }
        },
        {
          text: 'Delete',
          cssClass: 'primary',
          handler: () => {
            this.tasksService.deleteTask(this.loadedTask).subscribe();
            this.navCtrl.navigateBack("/tasktracker/submit-my-progress");
            return;
          }
        }
      ]
    });
    await alert.present();
  }

  // Update MyTask list from API
  onViewWillEnter(){
    this.tasksService.fetchMyTasks(this.tasksService.loginedUser.userId); // TODO: This should be the actual current login user
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
