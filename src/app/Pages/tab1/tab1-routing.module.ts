import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab1Page } from "./tab1.page";

const routes: Routes = [
  {
    path: "",
    component: Tab1Page,
  },
  // {
  //   path: "", //redirectTo: 'team-progress', // loadChildren:'../tab1/tab1.module#Tab1PageModule',
  //   loadChildren: () =>
  //     import("../tab1/tab1.module").then((m) => m.Tab1PageModule),
  //   //component: Tab1Page,
  // },
  // {
  //   path: ":userid",
  //   loadChildren: () =>
  //     import("../user-tasks/user-tasks.module").then((m) => m.UserTasksModule), // loadChildren:"../Components/user-tasks/user-tasks.module#UserTasksModule",
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
