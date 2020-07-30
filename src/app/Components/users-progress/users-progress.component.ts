import { Component, OnInit } from '@angular/core';
import { UserProgress } from 'src/app/Models/user-progress/user-progress';
import { DataService  } from 'src/app/Services/data-service.service';
import { PopoverController } from '@ionic/angular';
import { UserTasksComponent } from '../user-tasks/user-tasks.component';
@Component({
  selector: 'app-users-progress',
  templateUrl: './users-progress.component.html',
  styleUrls: ['./users-progress.component.scss'],
})
export class UsersProgressComponent implements OnInit {
  userProgress = new Array<UserProgress>();
  constructor(private datasev :DataService,public popoverController: PopoverController ) { }

  ngOnInit() {
    this.userProgress = this.datasev.userProgress ;
  console.log(this.datasev.userProgress )   
  
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserTasksComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
