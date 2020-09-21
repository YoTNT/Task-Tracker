import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { TasksService } from "src/app/Services/tasks.service";

import { SubTask } from "src/app/Models/sub-task";
import { Router } from "@angular/router";
import { Task } from "src/app/Models/task";
import { User } from "src/app/Models/user";
import { AuthService } from "src/app/Services/authService.service";

@Component({
  selector: "app-create-subtask",
  templateUrl: "./create-subtask.page.html",
  styleUrls: ["./create-subtask.page.scss"],
})
export class CreateSubtaskPage implements OnInit, OnDestroy {
  form: FormGroup;
  subTask: SubTask = new SubTask();
  isEdit: boolean = false;
  user: User;
  task: Task;
  txt: any;
  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService, // private formBuilder: FormBuilder
    private router: Router,
    private auth: AuthService
  ) {
    this.user = auth.getLoggedUser();

    if (!this.user) {
      // console.log(!this.user);
      this.router.ngOnDestroy();
    }
  }
  ngOnDestroy(): void {}
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      progress: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      taskdate: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
    this.fillForm();
  }
  saveSubTask() {

    this.isEdit?this.updateSubTask():this.createSubTask();
  }
  fillForm() {
    console.log("this.subTask", this.subTask);
    if (this.isEdit) {
      this.txt = "Edit";
      this.form.setValue({
        title: this.subTask.subtask,
        description: this.subTask.details,
        progress: parseInt(this.subTask.progress + ""),
        taskdate: this.subTask.taskdate,
      });
    } else {
      this.txt = "Create";
    }
  }
  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  onCreateTask() {
    if (this.form.valid && this.task) {
      console.log(
        "New-Task Page From FORM: ",
        this.form.value.title,
        this.form.value.description
      );
      this.tasksService
        .addTask(this.form.value.title, this.form.value.description)
        .subscribe();
      this.form.reset();
      this.modalCtrl.dismiss(null, "task created");
    } else {
      return;
    }

    // window.location.replace('tasktracker/mytasks')
  }

  async createSubTask() {
    if (this.form.valid && this.task) {
      this.subTask.taskid = this.isEdit ? this.subTask.taskid : this.task.id;
      this.subTask.taskdate = this.form.value.taskdate;
      this.subTask.details = this.form.value.description;
      this.subTask.subtask = this.form.value.title;
      this.subTask.progress = this.form.value.progress;
      this.subTask.userid = this.user.userId;
      console.log(this.subTask);
      if (this.form.value.title) {
        if (!this.isEdit) {
          await this.tasksService
            .addSubTask(this.subTask.id, this.subTask)
            .then((result) => {
              console.log("createSubTask() result ", result);
            })
            .catch((er) => {
              console.log(er);
            })
            .finally(() => {
              this.form.reset();
              this.modalCtrl.dismiss(null, "task created");
            });
        }
      }
    } else {
      console.log("There were undefined fields when creating a subtask");
    }
  }
  async updateSubTask() {
    if (this.form.valid && this.subTask) {
      this.subTask.taskid = this.isEdit ? this.subTask.taskid : this.task.id;
      this.subTask.taskdate = this.form.value.taskdate;
      this.subTask.details = this.form.value.description;
      this.subTask.subtask = this.form.value.title;
      this.subTask.progress = this.form.value.progress;
       this.subTask.userid =     this.subTask.userid ;
      console.log(this.subTask);
      if (this.form.value.title) {
        if (this.isEdit) {
          await this.tasksService
            .updateSubTask(this.subTask)
            .then((result) => {
              console.log("updateSubTask() result ", result);
            })
            .catch((er) => {
              console.log(er);
            })
            .finally(() => {
              this.form.reset();
              this.modalCtrl.dismiss(null, "task updated");
            });
        }
      }
    } else {
      this.form.setValue({ valid: false });
      console.log("There were undefined fields when creating a subtask");
    }
  }
}
