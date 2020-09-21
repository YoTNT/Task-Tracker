import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonItemSliding, ModalController } from "@ionic/angular";
import { Task } from "../../Models/task";
import { TasksService } from "../../Services/tasks.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CreateTaskPage } from "src/app/Pages/create-task/create-task.page";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit, OnDestroy {
  loadedTasks: Task[];
  userProgress: Task[];
  private taskSub: Subscription;
  isLoading = false;
  isLoadingError = false;
  isRefreshing = false;
  constructor(
    private tasksService: TasksService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getAllTasks();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter for Tab3!");

    if (this.tasksService.loginedUser) {
      this.isLoading = true;
    } else {
      this.isLoadingError = true;
      return;
    }

    this.tasksService
      .fetchMyTasks(this.tasksService.loginedUser.userId)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  ionViewWillLeave() {}

  doRefresh(event) {
    this.isRefreshing = true;

    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
      this.isRefreshing = false;
    }, 2000);
  }

  onEdit(taskId: string, slidingItem: IonItemSliding) {
    console.log("Getting into onEdit");
    console.log("Tast ID is: ", taskId);
    slidingItem.close();
    this.router.navigate(["/", "tasktracker", "mytasks", taskId]);
  }

  openNewTaskModal() {
    this.modalCtrl
      .create({
        component: CreateTaskPage,
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        console.log("ResultData: ", resultData);
        this.ionViewWillEnter();
      });
  }

  onDelete(task: Task, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.tasksService.deleteTask(task);
  }

  ngOnDestroy() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }
  getAllTasks() {
    this.taskSub = this.tasksService.myTasks.subscribe((tasks) => {
      this.loadedTasks = tasks;
      this.userProgress= new Array();
      this.userProgress = tasks.slice();
    });
  }
  getInprogress() {
    this.userProgress = new Array();
    this.userProgress = this.loadedTasks
      .filter((x) => this.parsPercentage(x.progress) < 100)
      .slice();
  }
  getCompleted() {
    this.userProgress = new Array();
    this.userProgress = this.loadedTasks
      .filter((x) => this.parsPercentage(x.progress) >= 100)
      .slice();
    console.log("getCompleted", this.userProgress);
  }

  getTotalInProgress(): any {
    return this.loadedTasks
      .filter((x) => this.parsPercentage(x.progress) < 100)
      .slice().length;
  }
  getTotalCompleted(): any {
    return this.loadedTasks
      .filter((x) => this.parsPercentage(x.progress) >= 100)
      .slice().length;
  }
  parsPercentage(val): number {
    return parseFloat(val) > 1 ? parseFloat(val) : parseFloat(val) * 100;
  }
}
