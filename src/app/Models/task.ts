export class Task {
  public task: string;
  public id: string;
  public taskdate: any;
  public details: string;
  public userid: string;
  public progress: number;
  constructor(task?, id?, taskdate?, details?, userid?, progress?) {
    this.task = task;
    this.id = id;
    this.taskdate = taskdate;
    this.details = details;
    this.userid = userid;
    this.progress = progress;
  }
}
