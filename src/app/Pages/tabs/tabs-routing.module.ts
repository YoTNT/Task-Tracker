import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { ReportPage } from "../report/report.page";
const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "users-progress", // loadChildren: () => //   import("../tab1/tab1.module").then((m) => m.Tab1PageModule), // loadChildren:'../tab1/tab1.module#Tab1PageModule',
        children: [
          {
            path: "", //redirectTo: 'users-progress', // loadChildren:'../tab1/tab1.module#Tab1PageModule',
            loadChildren: () =>
              import("../tab1/tab1.module").then((m) => m.Tab1PageModule),
          },
          {
            path: ":userid",
            loadChildren: () =>
              import("../user-tasks/user-tasks.module").then(
                (m) => m.UserTasksModule
              ), // loadChildren:"../Components/user-tasks/user-tasks.module#UserTasksModule",
          },
        ],
      },
      {
        path: "reports",
        loadChildren: () =>
          import("../tab2/tab2.module").then((m) => m.Tab2PageModule),
 
      },
      {
        path: "mytasks",
        loadChildren: () =>
          import("../tab3/tab3.module").then((m) => m.Tab3PageModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
