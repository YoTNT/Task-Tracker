import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePage } from "./Pages/home/home.page";

// const routes: Routes = [
//   {
//     path: "",
//     // loadChildren: () =>
//     //   import("./Pages/home/home.module").then((m) => m.HomePageModule),
//     component: HomePage,
//     // loadChildren: './Pages/home/home.module#HomePageModule',
//      pathMatch: "full",
//     //redirectTo:"home",
//     // pathMatch: "prefix",
//   },
//   {
//     path: "home",
//     loadChildren: () =>
//       import("./Pages/home/home.module").then((m) => m.HomePageModule),
//   },

//   {
//     path: "tasktracker",
//     // loadChildren: () =>
//     //   import("./Pages/tabs/tabs.module").then((m) => m.TabsPageModule),
//     children: [
//       { path: "", loadChildren: "./Pages/tabs/tabs.module#TabsPageModule" },
//       {
//         path: "team-progress",
//         loadChildren: "./Pages/tab1/tab1.module#Tab1PageModule",
//       },

//       {
//         path: "reports",
//         loadChildren: "./Pages/tab2/tab2.module#Tab2PageModule",
//       },
//       {
//         path: "mytasks",
//         loadChildren: "./Pages/tab3/tab3.module#Tab3PageModule",
//       },
//       // {
//       //   path: "",
//       //   loadChildren: () =>
//       //     import("./Pages/tabs/tabs.module").then((m) => m.TabsPageModule),
//       // },
//       // {
//       //   path: "reports",
//       //   loadChildren: () =>
//       //     import("./Pages/tab2/tab2.module").then((m) => m.Tab2PageModule),
//       // },

//     ],
//   },
//   {
//     path: "create-task",
//     loadChildren: () =>
//       import("./Pages/create-task/create-task.module").then(
//         (m) => m.CreateTaskPageModule
//       ),
//   },
//   {
//     path: "login",
//     loadChildren: () =>
//       import("./Pages/login/login.module").then((m) => m.LoginPageModule),
//   },

//   {
//     path: "create-task",
//     loadChildren: () =>
//       import("./Pages/create-task/create-task.module").then(
//         (m) => m.CreateTaskPageModule
//       ),
//   },

//   // {
//   //   path: "**",
//   //   loadChildren: () =>
//   //     import("./Pages/home/home.module").then((m) => m.HomePageModule),
//   // },
// ];
const routes: Routes = [
  { path: "", loadChildren: "./Pages/tabs/tabs.module#TabsPageModule" },

  { path: "index", loadChildren: "./Pages/home/home.module#HomePageModule" },

  { path: "login", loadChildren: "./Pages/login/login.module#LoginPageModule" },
  {
    path: "**",
    redirectTo: "index",
    pathMatch: "full",
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
