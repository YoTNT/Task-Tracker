import { Component, OnInit, Input } from "@angular/core";
import { Task } from "../../Models/task";
import { User } from "../../Models/user";
 
 
@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit {
  user: User = new User(1, "Wael Dawoud");
  @Input() task: Task;

  constructor ()
  {
  }

  ngOnInit() {}

  parsPercentage(val): number {
    return parseInt(val) > 1 ? parseInt(val) : parseInt(val) * 100;
  }

}
