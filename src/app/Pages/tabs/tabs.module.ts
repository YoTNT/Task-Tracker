import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 

import { TabsPageRoutingModule } from './tabs-routing.module';
// import{TextAvatarModule} from '../../directives/text-avatar.directive.module'
import { TabsPage } from './tabs.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    // TextAvatarModule
    
  ],
  declarations: [TabsPage],
 
})
export class TabsPageModule {}
