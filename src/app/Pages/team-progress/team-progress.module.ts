import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamProgressPageRoutingModule } from './team-progress-routing.module';

import { TeamProgressPage } from './team-progress.page';
 
import { UserTasksPage } from '../user-tasks/user-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamProgressPageRoutingModule
  ],
  declarations: [TeamProgressPage , UserTasksPage]
})
export class TeamProgressPageModule {}
