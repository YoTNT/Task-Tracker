import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TeamProgressPage } from "./team-progress.page";

const routes: Routes = [
  {
    path: "",
    component: TeamProgressPage,
  },
  {
    path: ":userid",
    loadChildren: () =>
      import("../user-tasks/user-tasks.module").then((m) => m.UserTasksModule),
    // loadChildren: "../user-tasks/user-tasks.module#UserTasksModule",
    // loadChildren:"../Components/user-tasks/user-tasks.module#UserTasksModule",
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamProgressPageRoutingModule {}
