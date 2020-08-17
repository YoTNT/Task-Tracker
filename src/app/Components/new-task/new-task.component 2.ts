import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from 'src/app/Services/tasks.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {

  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService,
    // private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onCreateTask(){
    console.log("New-Task Page From FORM: ", this.form.value.title, this.form.value.description);
    // this.tasksService.addTask(this.form.value.title, this.form.value.description).subscribe();
    this.form.reset();
    // this.modalCtrl.dismiss(null, 'task created');
  }
}
 