import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePage } from "./Pages/home/home.page";
import { auth } from 'firebase';
import { ActivateGuard } from './Services/activate.guard';

 
const routes: Routes = [
  { path: "", loadChildren: "./Pages/tabs/tabs.module#TabsPageModule"

},

  { path: "index", loadChildren: "./Pages/home/home.module#HomePageModule" },

  { path: "login", loadChildren: "./Pages/login/login.module#LoginPageModule" },
 
  {
  //  pathMatch: 'full',
    path: 'chat/:id',
    canActivate: [ActivateGuard],
    // path: 'chat/:groupId/:CurrentUserIdFromFirebase',
    loadChildren: () => import('./Pages/chat/chat.module').then( m => m.ChatPageModule)
  },
 
  {
    path: "**",
    redirectTo: "index",
    pathMatch: "full",
  },
  {
    path: 'report-task-period',
    loadChildren: () => import('./Pages/report-task-period/report-task-period.module').then( m => m.ReportTaskPeriodPageModule)
  },
 
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
