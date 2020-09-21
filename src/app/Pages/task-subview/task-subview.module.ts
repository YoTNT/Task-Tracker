import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskSubviewPageRoutingModule } from './task-subview-routing.module';
import{TextAvatarModule} from '../../directives/text-avatar.directive.module'
import { TaskSubviewPage } from './task-subview.page';
import { SubTaskComponent } from 'src/app/Components/sub-task/sub-task.component';
import { ExpandableComponent } from 'src/app/Components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskSubviewPageRoutingModule,
    TextAvatarModule
  ],
  declarations: [TaskSubviewPage,SubTaskComponent,ExpandableComponent]
})
export class TaskSubviewPageModule {}
