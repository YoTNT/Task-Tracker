import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { UserTasksPage } from "../Components/user-tasks/user-tasks.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "users-progress",
        loadChildren: () =>
          import("../tab1/tab1.module").then((m) => m.Tab1PageModule),
        // the above route is equal to: loadChildren:'../tab1/tab1.module#Tab1PageModule'
        children: [
          { path: "", loadChildren: "../tab1/tab1.module#Tab1PageModule" },
          {
            path: ":userid",
            loadChildren:
              "../Components/user-tasks/user-tasks.module#UserTasksModule",
          },
        ],
      },
      {
        path: "my-tasklist",
        loadChildren: () =>
          import("../tab2/tab2.module").then((m) => m.Tab2PageModule),
      },
      {
        path: "submit-my-progress",
        loadChildren: () =>
          import("../tab3/tab3.module").then((m) => m.Tab3PageModule),
      },
      // {
      //   path: "usertasks",
      //   // component: UserTasksPage
      //   //  loadChildren: () => import('../Components/user-tasks/user-tasks.module').then(m => m.UserTasksModule)
      //   loadChildren:
      //     "../Components/user-tasks/user-tasks.module#UserTasksModule",
      // },
      // {
      //   path: '',
      //   redirectTo: 'users-progress',
      //   pathMatch: 'full'
      // }
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
