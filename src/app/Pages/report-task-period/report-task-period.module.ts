import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportTaskPeriodPageRoutingModule } from './report-task-period-routing.module';

import { ReportTaskPeriodPage } from './report-task-period.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportTaskPeriodPageRoutingModule
  ],
  declarations: [ReportTaskPeriodPage]
})
export class ReportTaskPeriodPageModule {}
