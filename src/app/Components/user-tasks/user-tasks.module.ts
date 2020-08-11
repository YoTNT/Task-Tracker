import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
 import {UserTasksRoutingModule} from 'src/app/Components/user-tasks/user-tasks-routing.module'
 
import { UserTasksPage } from 'src/app/Components/user-tasks/user-tasks.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserTasksRoutingModule
 
    
  ],
  declarations: [UserTasksPage]
})
export class UserTasksModule  {}
