import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDetialPage } from './task-detial.page';

const routes: Routes = [
  {
    path: '',
    component: TaskDetialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskDetialPageRoutingModule {}
