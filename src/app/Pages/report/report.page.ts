import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { ReportService } from "../../Services/report.service";
import { Task } from "../../Models/task";
import { User } from "src/app/Models/user";
import { UserInfo } from "src/app/Models/user-info";

declare var google;

@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
})
export class ReportPage {
  //deafult is a working userId and date case, other dates/userId combo may not work due to differing format or lack of data
  tasks: Task[] = new Array(10);
  userArr: UserInfo[] = new Array(0);
  userId: string = "5";
  dateArr: string[] = new Array(0);
  taskDate: string = "2020-08-06";

  constructor(public platform: Platform, public api: ReportService) {
    this.api.getUsers().subscribe((data) => {
      this.userArr = data;
    });

    this.api.getTasks().subscribe((data) => {
      for (const t of data) {
        this.dateArr.push(t.taskdate);
      }
    });

    this.platform.ready().then(() => {
      google.charts.load("current", { packages: ["corechart"] });
    });
  }

  //helps with async issue
  processData() {
    this.api
      .getTaskByDateAndId(this.userId, this.taskDate)
      .subscribe((data) => {
        this.tasks = data;
      });

    setTimeout(() => this.DrawPieChart(), 250);
  }

  DrawPieChart() {
    console.log(this.userArr);
    var data: any = new google.visualization.DataTable();
    let total: number = 0;

    data.addColumn("string", "Task");
    data.addColumn("number", "Progress");

    //for percent in format "#%" - parseFloat and divide by 100
    for (const t of this.tasks) {
      data.addRows([[t.task, parseFloat("" + t.progress) / 100]]);
      total = total + parseFloat("" + t.progress) / 100;
    }

    data.addRows([["Pending", 1 - total]]);

    var options = {
      title: "Associate Task Status",
      is3D: true,
      legend: { position: "labeled" },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("div_pie")
    );
    chart.draw(data, options);
  }
}
