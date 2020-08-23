import { Component, OnInit } from "@angular/core";
import { TaskProgressService } from "src/app/Services/task-progress-service.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/Models/user";
 
@Component({
  selector: "app-user-tasks",
  templateUrl: "user-tasks.page.html",
  styleUrls: ["user-tasks.page.scss"],
})
export class UserTasksPage implements OnInit {
  userProgress: Array<any> = [];
  user: User = new User(1, "Wael Dawoud");
  //  listingdata:Array<any> = [];
  constructor(
    private datasev: TaskProgressService,
    private activeroute: ActivatedRoute,
  
  ) {
     
  }

  private getUserTasks() {
    let userid: number;
    this.activeroute.paramMap.subscribe((param) => {
      if (!param.has("userid")) {
        //console.log("return");
        return;
      }
      userid = Number.parseInt(param.get("userid"));
      // console.log(userid);
      this.userProgress = this.datasev.getUserTasks(userid);
    });
  }

  ngOnInit() {}
  ionViewWillEnter() {
    //  console.log("this.ionViewWillEnter");
    this.getUserTasks();
    //console.log(this.userProgress);
  }
  ionViewDidLoad() {
    // console.log("this.ionViewDidLoad");
  }
  getTotalInProgress(): any {
    return this.userProgress.filter((x) => x.progress < 100).length;
  }
  getTotalCompleted(): any {
    return this.userProgress.filter((x) => x.progress >= 100).length;
  }
}
