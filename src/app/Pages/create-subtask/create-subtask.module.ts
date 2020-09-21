import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
 

import { CreateSubtaskPageRoutingModule } from './create-subtask-routing.module';

import { CreateSubtaskPage } from './create-subtask.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateSubtaskPageRoutingModule
  ],
  declarations: [CreateSubtaskPage]
})
export class CreateSubtaskPageModule {}
