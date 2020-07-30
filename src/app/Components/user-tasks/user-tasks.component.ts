import { Component, OnInit } from '@angular/core';
import { UserProgress } from 'src/app/Models/user-progress/user-progress';
import { DataService  } from 'src/app/Services/data-service.service';
 
 

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {

  userProgress = new Array<UserProgress>();
  constructor(private datasev :DataService ) { }

  ngOnInit() {
    this.userProgress = this.datasev.userProgress ;
  console.log(this.datasev.userProgress )   
  
  }

}
