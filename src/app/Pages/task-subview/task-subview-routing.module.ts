import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskSubviewPage } from './task-subview.page';

const routes: Routes = [
  {
    path: '',
    component: TaskSubviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskSubviewPageRoutingModule {}
