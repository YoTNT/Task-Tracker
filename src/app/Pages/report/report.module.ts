import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReportPage } from "./report.page";

import { ReportPageRoutingModule } from './report-routing.module';
import { TasksService } from '../../Services/tasks.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule,
    HttpClientModule
  ],
  providers:
  [
      TasksService,
      HttpClient
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}