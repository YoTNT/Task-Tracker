import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartChatPageRoutingModule } from './start-chat-routing.module';
import {TextAvatarModule} from '../../directives/text-avatar.directive.module'
import { StartChatPage } from './start-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartChatPageRoutingModule,
    TextAvatarModule
  ],
  declarations: [StartChatPage]
})
export class StartChatPageModule {}
