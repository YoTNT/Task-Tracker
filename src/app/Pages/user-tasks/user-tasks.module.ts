import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
 import {UserTasksRoutingModule} from '../../Pages/user-tasks/user-tasks-routing.module'
 
import { UserTasksPage } from '../../Pages/user-tasks/user-tasks.page';
import { TextAvatarModule  } from '../../directives/text-avatar.directive.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserTasksRoutingModule,
    TextAvatarModule 
 
    
  ],
  declarations: [UserTasksPage]
})
export class UserTasksModule  {}
