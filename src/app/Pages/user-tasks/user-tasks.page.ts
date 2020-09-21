import { Component, OnInit } from "@angular/core";
import { TaskProgressService } from "src/app/Services/task-progress-service.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/Models/user";
import { AuthService } from "src/app/Services/authService.service";
import { UsersService } from "src/app/Services/users.service";
import { TasksService } from "src/app/Services/tasks.service";
import { Task } from "src/app/Models/task";
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-user-tasks",
  templateUrl: "user-tasks.page.html",
  styleUrls: ["user-tasks.page.scss"],
})
export class UserTasksPage implements OnInit {
  userProgress: Array<any> = [];
  userProgressList: Array<any> = [];
  tasks: Task[] = new Array();
  user:User = Object.create(User);
  //  listingdata:Array<any> = [];
  constructor(
    private datasev: TaskProgressService,
    private activeroute: ActivatedRoute,
    private aut: AuthService,
    private usrServ: UsersService,
    private taskServ: TasksService,
    public navCtr:NavController,
  ) {}

  getUserTasks() {
    let userid: number;
    this.activeroute.paramMap.subscribe((param) => {
      if (!param.has("userid")) {
        //console.log("return");
        return;
      }
      userid = Number.parseInt(param.get("userid"));
      this.user.userId = userid;
      // console.log(userid);

      this.taskServ.fetchMyTasks("" + userid).subscribe((tasks) => {
        this.userProgressList = tasks.slice();
        this.userProgress= new Array();
        this.userProgress = tasks.slice();
      
      });
    });
  }
  back()
  {
    this.navCtr.back();
  }
  ngOnInit() {}
  ionViewWillEnter() {
    //  console.log("this.ionViewWillEnter");
  
    this.getUserTasks();  this.user = this.usrServ.getUserById(this.user.userId)
    //console.log(this.userProgress);
  }
  ionViewDidLoad() {
    // console.log("this.ionViewDidLoad");
  }
  getInprogress()
  {
    this.userProgress= new Array();
    this.userProgress= this.userProgressList.filter((x) => this.parsPercentage(x.progress) < 100).slice();
  }
  getCompleted()
  {
  
    this.userProgress= new Array();
    this.userProgress= this.userProgressList.filter((x) => this.parsPercentage(x.progress) >= 100).slice(); 
     console.log("getCompleted", this.userProgress);
  }

   
  getTotalInProgress(): any {
    return this.userProgressList.filter((x) => this.parsPercentage(x.progress) < 100).slice().length;
  }
  getTotalCompleted(): any {
    return this.userProgressList.filter((x) => this.parsPercentage(x.progress)  >= 100).slice().length;
  }
  parsPercentage(val): number {
    return parseFloat(val) > 1 ? parseFloat(val) : parseFloat(val) * 100;
  }
}
