import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  }
  ,
  {
    path: "singledayview",
    loadChildren: () =>
      import("../../Pages/report/report.module").then((m) => m.ReportPageModule),
  },
  {
    path: "periodview",
    loadChildren: () =>
      import("../../Pages/report-task-period/report-task-period.module").then((m) => m.ReportTaskPeriodPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
