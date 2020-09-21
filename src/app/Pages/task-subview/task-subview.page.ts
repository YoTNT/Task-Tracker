import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  RendererFactory2,
} from "@angular/core";
import { Task } from "../../Models/task";
import { ActivatedRoute } from "@angular/router";
import {
  NavController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { TasksService } from "src/app/Services/tasks.service";
import { Subscription } from "rxjs";

import { CreateSubtaskPage } from "../create-subtask/create-subtask.page";
import { AuthService } from "src/app/Services/authService.service";

@Component({
  selector: "app-task-subview",
  templateUrl: "./task-subview.page.html",
  styleUrls: ["./task-subview.page.scss"],
})
export class TaskSubviewPage implements OnInit {
  loadedTask = Object.create(Task); // Variable need to be initialized!!!
  taskSub: Subscription;
  rendr: Renderer2;
  subTasks: any[] = new Array();

  @ViewChild("divMsg") divMsg: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private tasksService: TasksService,
    private alCtr: AlertController,
    public navCtr: NavController,
    private modalCtrl: ModalController,
    private renderFctry: RendererFactory2,
    public auth: AuthService
  ) {
    this.rendr = renderFctry.createRenderer(null, null);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("taskid")) {
        this.navCtrl.navigateBack("/tasktracker/teamprogress");
        return;
      }

      this.taskSub = this.tasksService
        .getTask(paramMap.get("taskid"))
        .subscribe((task) => {
         // console.log("Subscripting: ", task);
          this.loadedTask = task;
          this.loadedTask.progress = this.parsPercentage(task.progress);
          //console.log("This.loadedTask.id = ", this.loadedTask.id);
          this.getSubTasks(task.id).then((res) => {
            // res[0].expanded=true;
            this.subTasks = res;

            this.subTasks.map((item) => {
              //Add isExpanded property to the subtask object 
              item.expanded = false;
            });
            if (this.subTasks.length < 1) {
              this.divMsg.nativeElement.style.display = "block";
            } else {
              this.divMsg.nativeElement.style.display = "none";
              this.subTasks[0].expanded = true;
            }
        //    console.log("   this.subTasks .expanded= ; ", this.subTasks);
          });
        });
    });
  }
    getSubTasks(taskid): Promise<any[]> {
    let subtasklist =   this.tasksService
      .getSubTasks(taskid)
      .then((res) => {
       console.log(" getSubTasks(taskid): Promise<SubTask[]>", res);

        return res.sort(
          (a, b) => Date.parse(b.taskdate) - Date.parse(a.taskdate)
        ); // order by date DESC;
      });
    return subtasklist;
  }
  back() {
    this.navCtrl.back();
  }
  parsPercentage(val): number {
    // let progress = (parseFloat(val) > 1
    //   ? parseFloat(val)
    //   : parseFloat(val) * 100
    // ).toFixed(0);

    return Number(
      (parseFloat(val) > 1 ? parseFloat(val) : parseFloat(val) * 100).toFixed(0)
    );
  }

  onViewWillEnter() {
    this.tasksService.fetchMyTasks(this.tasksService.loginedUser.userId);
  }

  onViewWillLeave() {
    this.tasksService.updateTask(this.loadedTask);
  }

  ngOnDestroy() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }
  openNewTaskModal() {
    if (this.auth.isLoggedIn()) {
      this.modalCtrl
        .create({
          component: CreateSubtaskPage,
          componentProps: { task: this.loadedTask },
        })
        .then((modalElement) => {
          modalElement.present();
          return modalElement.onDidDismiss();
        })
        .then(() => {
         // console.log("ResultData: ", resultData);
          this.loadData();
        });
    } else return false;
  }

  itemId: any;
  expandItem(item) {
    this.subTasks.map((listItem: any) => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      // if (!listItem) {
      //   this.rendr.setAttribute(
      //     this.lstTasks.nativeElement,
      //     "detailIcon",
      //     "chevron-down-outline"
      //   );
      // }
      return listItem;
    });
  }
}
