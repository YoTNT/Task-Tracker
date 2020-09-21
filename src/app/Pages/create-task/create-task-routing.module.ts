import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTaskPage } from './create-task.page';
import { ActivateGuard } from 'src/app/Services/activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[ActivateGuard],
    component: CreateTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTaskPageRoutingModule {}