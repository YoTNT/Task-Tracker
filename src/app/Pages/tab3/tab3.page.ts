import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { Task } from '../../Models/task';
import { TasksService } from '../../Services/tasks.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewTaskComponent } from 'src/app/Components/new-task/new-task.component';
import { CreateTaskPage } from 'src/app/Pages/create-task/create-task.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy{

  loadedTasks: Task[];
  private taskSub: Subscription;
  isLoading = false;
  isLoadingError = false;
  isRefreshing = false;
  constructor(
    private tasksService: TasksService, 
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){
    this.taskSub = this.tasksService.myTasks.subscribe(tasks => {
      this.loadedTasks = tasks;
    });
  }

  ionViewWillEnter(){
    // this.loadedTasks = this.tasksService.myTasks;

    if(this.tasksService.loginedUser){
      this.isLoading = true;
    }
    else{
      this.isLoadingError = true;
      return;
    }

    // Testing
    // TODO: Need to pass the right userId into fetchMyTasks
    this.tasksService.fetchMyTasks(this.tasksService.loginedUser.userId).subscribe(() => {
      this.isLoading = false;
    }); // Access API
  }

  ionViewWillLeave(){

  }

  doRefresh(event) {
    this.isRefreshing = true;

    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
      this.isRefreshing = false;
    }, 2000);
  }

  onEdit(taskId: string, slidingItem: IonItemSliding){
    console.log("Getting into onEdit");
    console.log("Tast ID is: ", taskId);
    slidingItem.close();
    this.router.navigate(['/', 'tasktracker', 'mytasks', taskId]);
  }

  openNewTaskModal(){
    this.modalCtrl
      .create({
        component: CreateTaskPage,
      })
      .then(modalElement => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then(resultData => {
        console.log("ResultData: ", resultData);
      })
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