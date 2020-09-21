import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSubtaskPage } from './create-subtask.page';
import { ActivateGuard } from 'src/app/Services/activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[ActivateGuard],
    component: CreateSubtaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSubtaskPageRoutingModule {}
