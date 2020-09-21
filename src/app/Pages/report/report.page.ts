import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { ReportService } from "../../Services/report.service";
import { Task } from "../../Models/task";
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
  userId: string = "0";
  dateArr: string[] = new Array(0);
  taskDate: string = "2020-08-14";

  constructor(public platform: Platform, public api: ReportService) {
    this.api.getUsers().subscribe((data) => {
      this.userArr = data.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    });

    this.api.getTasks().subscribe((data) => {
      let sortdata = data
        .sort((a, b) => Date.parse(b.taskdate) - Date.parse(a.taskdate))
        .slice();
      for (const t of sortdata) {
        let duplicate = false;

        for (const d of this.dateArr) {
          if (d == t.taskdate) {
            duplicate = true;

            break;
          }
        }
        if (!duplicate) {
          if (t.taskdate) this.dateArr.push(t.taskdate);
        }
      }
    });

    this.platform.ready().then(() => {
      google.charts.load("current", { packages: ["corechart"] });
    });
  }

  //helps with async issue
  processData() {
    let self = this;
    this.api
      .getTaskByDateAndId(this.userId, this.taskDate)
      .subscribe((data) => {
        self.tasks = data;
      });

    setTimeout(() => this.DrawPieChart(), 500);
  }

  DrawPieChart() {
    var data: any = new google.visualization.DataTable();
    let total: number = 0;

    data.addColumn("string", "Task");
    data.addColumn("number", "Progress");

    //for percent in format "#%" - parseFloat and divide by 100
    for (const t of this.tasks) {
      const val = this.parsPercentage(t.progress);
      data.addRows([[t.task, val / 100]]);
      total = total + val / 100;
    }
    if (total < 1) {
      data.addRows([["Pending", 1 - total]]);
    }

    var options = {
      title: "Associate Task Status",
      is3D: true,
      backgroundColor: {
        stroke: "#16b7fc",
        strokeWidth: 1,
        fill: "transparent",
      },

      legend: {
        position: "labeled",
        textStyle: {
          color: "#16b7fc",
          bold: false,
          italic: true,
        },
      },
      enableInteractivity: true,
      titleTextStyle: {
        color: "#16b7fc",
        fontSize: "13",
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("div_pie")
    );
    chart.draw(data, options);
  }
  parsPercentage(val): number {
    return Number(
      (parseFloat(val) > 1 ? parseFloat(val) : parseFloat(val) * 100).toFixed(0)
    );
  }
}
