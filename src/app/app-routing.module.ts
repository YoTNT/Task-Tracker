import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
 
const routes: Routes = [
  {
    path: "",
    redirectTo: "tasktracker",
    pathMatch: "full",
  },
  {
    path: "tasktracker",
 //loadChildren: () =>import("./Pages/tabs/tabs.module").then((m) => m.TabsPageModule),
    children: [
      { path: "", loadChildren: "./Pages/tabs/tabs.module#TabsPageModule" },
  
    ],
  },
  {
    path: 'create-task',
    loadChildren: () => import('./Components/create-task/create-task.module').then( m => m.CreateTaskPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
