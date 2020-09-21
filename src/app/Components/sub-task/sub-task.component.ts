import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Input,
  Inject,
} from "@angular/core";
import { CreateSubtaskPage } from "src/app/Pages/create-subtask/create-subtask.page";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/Services/authService.service";
import { UsersService } from "src/app/Services/users.service";
import { User } from "src/app/Models/user";

@Component({
  selector: "app-sub-task",
  templateUrl: "./sub-task.component.html",
  styleUrls: ["./sub-task.component.scss"],
})
export class SubTaskComponent implements OnInit {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "150px";
  @Input("SubTaskObj") SubTaskObj: any = new Object();

  constructor(
    public rendr: Renderer2,
    private modalCtrl: ModalController,
    public auth: AuthService,
    private userServ: UsersService
  ) {}

  // ngAfterViewInit() {
  //   this.renderer.setStyle(
  //     this.expandWrapper.nativeElement,
  //     "max-height",
  //     this.expandHeight
  //   );
  // }

  ngOnInit() {}

  parsPercentage(val): number {
    return parseInt(val) > 1 ? parseInt(val) : parseInt(val) * 100;
  }
  editSubTask() {
    console.log("Dddd");
  }
  openNewTaskModal() {
    console.log(" openNewTaskModal()this.SubTaskObj",this.SubTaskObj)
    if (this.auth.isLoggedIn()) {
      this.modalCtrl
        .create({
          component: CreateSubtaskPage,
          cssClass: "my-custom-modal-class ",
          componentProps: { subTask: this.SubTaskObj, isEdit: true },

          
        })
        .then((modalElement) => {
          modalElement.present();
          return modalElement.onDidDismiss();
        })
        .then(() => {
          this.SubTaskObj.expanded = true;
          // console.log("ResultData: ", resultData);
          // this.loadData();
        });
    } else return false;
  }
  getTaskOwnerName(id: any): any {
    try {
      let usr = this.userServ.findUserById(id);
     // console.log("getTaskOwnerName" ,id,usr)
      if (usr) return usr.userName?usr.userName:"";
      else return "";
    } catch (err) {
      console.log(err);
    }
  }
}
