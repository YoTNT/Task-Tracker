import { Component, OnInit, ViewChild } from "@angular/core";
import {NgForm, FormControl, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { TasksService } from "src/app/Services/tasks.service";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.page.html",
  styleUrls: ["./create-task.page.scss"],
})
export class CreateTaskPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService // private formBuilder: FormBuilder
  ) {}
@ViewChild('f') form:NgForm;
  ngOnInit() {

    // this.form = new FormGroup({
    //   title: new FormControl(null, {
    //     updateOn: "blur",
    //     validators: [Validators.required],
    //   }),
    //   description: new FormControl(null, {
    //     updateOn: "blur",
    //     validators: [Validators.required],
    //   }),
    // });
  }
  onsubmit()
  {
    console.log("form",this.form)
  }
  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  onCreateTask() {
    if (this.form.value.title && this.form.value.description) {
      this.tasksService
        .addTask(this.form.value.title, this.form.value.description)
        .subscribe();
      this.form.reset();
      this.modalCtrl.dismiss(null, "task created");
    } else return;

    // window.location.replace('tasktracker/mytasks')
  }
}
