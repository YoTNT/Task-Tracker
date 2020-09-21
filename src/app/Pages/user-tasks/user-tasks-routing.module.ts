import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTasksPage} from './user-tasks.page';
 

const routes: Routes = [
  {
    path: '',
    component: UserTasksPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTasksRoutingModule {}
