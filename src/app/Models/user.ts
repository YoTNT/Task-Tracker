export class User {
  userId: any;
  userName: string;
  email: string;
  avatar: string;

  constructor(userid?, username?, email?, avatar?) {
    this.userId = userid;
    this.userName = username;
    this.email = email;
    this.avatar = avatar;
  }
}
