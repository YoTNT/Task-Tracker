import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TeamProgressPageRoutingModule } from "./team-progress-routing.module";

import { TeamProgressPage } from "./team-progress.page";
import { TextAvatarModule } from "src/app/directives/text-avatar.directive.module";
import { UserTasksPage } from "../user-tasks/user-tasks.page";
import { TodayTasksComponent } from "src/app/Components/today-tasks/today-tasks.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextAvatarModule,
    TeamProgressPageRoutingModule,
  ],
  declarations: [TeamProgressPage, TodayTasksComponent],
})
export class TeamProgressPageModule {}
