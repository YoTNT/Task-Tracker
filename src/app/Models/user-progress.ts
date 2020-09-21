export class UserProgress {
  // taskId: any;
  // taskName: string;
  userId: any;
  userName: any;
  avgProgress: any;
  totaltasks: any;
  totalInProgress: any;
  totalInCompeletd: any;
  constructor(
    userid?,
    username?,
    avgProgress?,
    totaltasks?,
    totalInProgress?,
    totalInCompeletd?
  ) {
    this.userId = userid;
    this.userName = username;
    this.avgProgress = avgProgress;
    this.totaltasks = totaltasks;
    this.totalInProgress = totalInProgress;
    this.totalInCompeletd = totalInCompeletd;
  }
}
