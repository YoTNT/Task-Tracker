import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TabsPage } from "src/app/tabs/tabs.page";
import { UserTasksComponent } from "src/app/Components/user-tasks/user-tasks.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "tasktracker",
    pathMatch: "full",
  },
  {
    path: "tasktracker",
    //loadChildren: () =>import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    children: [
      { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
