import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetialPageRoutingModule } from './task-detial-routing.module';

import { TaskDetialPage } from './task-detial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskDetialPageRoutingModule
  ],
  declarations: [TaskDetialPage]
})
export class TaskDetialPageModule {}