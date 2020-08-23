import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: ':taskId',
    loadChildren: () => import('../task-detial/task-detial.module').then( m => m.TaskDetialPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('../../Pages/create-task/create-task.module').then( m => m.CreateTaskPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}