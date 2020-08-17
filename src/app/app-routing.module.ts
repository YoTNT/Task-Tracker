import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePage } from "./Pages/home/home.page";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./Pages/home/home.module").then((m) => m.HomePageModule),
    // component:HomePage
    // loadChildren: './Pages/home/home.module#HomePageModule',
    pathMatch: "full",
  },
  {
    path: "tasktracker",
    //loadChildren: () =>import("./Pages/tabs/tabs.module").then((m) => m.TabsPageModule),
    children: [
      //   { path: "", loadChildren: "./Pages/tabs/tabs.module#TabsPageModule" },

      {
        path: "",
        loadChildren: () =>
          import("./Pages/tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./Pages/tab2/tab2.module").then((m) => m.Tab2PageModule),
      },
    ],
  },
  {
    path: "create-task",
    loadChildren: () =>
      import("./Pages/create-task/create-task.module").then(
        (m) => m.CreateTaskPageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./Pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./Pages/home/home.module").then((m) => m.HomePageModule),
  },
 
  {
    path: "create-task",
    loadChildren: () =>
      import("./Pages/create-task/create-task.module").then(
        (m) => m.CreateTaskPageModule
      ),
  },
  // {
  //   path: "**",
  //   loadChildren: () =>
  //     import("./Pages/home/home.module").then((m) => m.HomePageModule),
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
