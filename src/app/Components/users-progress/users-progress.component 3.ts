import { Component, OnInit } from "@angular/core";
import { UserProgress } from "src/app/Models/user-progress";
import { TaskProgressService } from "src/app/Services/task-progress-service.service";
import { PopoverController } from "@ionic/angular";
import { UserTasksPage } from "../../Pages/user-tasks/user-tasks.page";

@Component({
  selector: "app-users-progress",
  templateUrl: "./users-progress.component.html",
  styleUrls: ["./users-progress.component.scss"],
})
export class UsersProgressComponent implements OnInit {
  userProgress = new Array<UserProgress>();
  constructor(
    private datasev: TaskProgressService,
    public popoverController: PopoverController
  ) {}
  ngOnInit() {
    this.userProgress = this.datasev.userProgress;
    console.log(this.datasev.userProgress);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserTasksPage,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
