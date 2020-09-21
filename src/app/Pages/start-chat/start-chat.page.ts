import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ChatService } from "src/app/Services/chat.service";

import { NavController, IonSelect } from "@ionic/angular";
import { RouterOutlet, Router, ActivationStart } from "@angular/router";
import { forkJoin } from 'rxjs';

@Component({
  selector: "app-start-chat",
  templateUrl: "./start-chat.page.html",
  styleUrls: ["./start-chat.page.scss"],
})
export class StartChatPage implements OnInit ,OnDestroy {
  constructor(
    public chatService: ChatService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  currentFirebaseUserId = this.chatService.currentUserIdFromFirebaseSetFromHomePage;
  listOfUsers = [];
  currentUserEmail = this.chatService.currentUser.email;
  users: any[] = new Array();
  selectedUsers: any[] = new Array();

  participant = "";
  participant1 = "";
  title = "";
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild("lstallusers") mySelect: IonSelect;
  ngOnInit() {
    //getting firebase userid if not found
    if(this.currentFirebaseUserId == null || this.currentFirebaseUserId == '') {
      console.log("firebase userid not found");
      let user = this.chatService.findUser(this.currentUserEmail);
      //console.log(user);  //observable
      user.subscribe((result) => {
        // console.log("firebase user id retrieved ="+result[0].id);
        this.chatService.currentUserIdFromFirebaseSetFromHomePage = result[0].id;
        this.currentFirebaseUserId = result[0].id;
      });
    }
    setTimeout(() => {
      console.log(
        "check firebase user id here =" +
          this.currentFirebaseUserId
      );
      //this gets a list of all users
      this.getAllUsers();
      this.router.events.subscribe((e) => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "start-chat")
        this.outlet.deactivate();
      });
    }, 2000);
  }
  openSelect() {
    this.mySelect.open();
  }
  getAllUsers() {
    this.listOfUsers = [];
    this.chatService.getAllUsers().subscribe((result) => {
      result.forEach((r) => {
        if (
          r.payload.doc.data()["email"] != this.chatService.currentUser.email
        ) {
          // console.log("check following");
          // console.log(r.payload.doc.data());
          // console.log("firebase user id of this user ="+r.payload.doc.id);
          let user = {
            email: r.payload.doc.data()["email"],
            userName: r.payload.doc.data()["userName"],
            id: r.payload.doc.id
          };
          this.listOfUsers.push(user);
        }
      });
    });
    console.log("getAllUsers", this.listOfUsers);
  }
  removeUser(i) {
    this.selectedUsers.splice(i, 1);
  }

  // addUser(obj) {
  //   this.users.push(obj);
  //   // try {
  //   //   console.log("obj ", obj);
  //   //   if (obj) {
  //   //     for (let i in obj) {
  //   //       console.log(" for (let i in obj)", i);
  //   //     }
  //   //   }
  //   console.log(
  //     "when calling addUser function, this.selectedUsers array =",
  //     this.users
  //   );
  //   //   obj = null;
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // }
  // addUser(participant1) {
  //   // console.log("when calling addUser function, users array =");
  //   // console.log(this.users);
  //   this.participant = participant1;
  //   let obs = this.chatService.findUser(this.participant);
  //   forkJoin(obs).subscribe(res => {
  //     for (let data of res) {
  //       if (data.length > 0) {
  //         if(this.users.indexOf(data[0]) > -1) {
  //         } else {
  //           console.log("data[0]");
  //           console.log(data[0]);
  //           this.users.push(data[0]);
  //         }
  //       }
  //     }
  //     this.participant = '';
  //   });
  // }

  createGroup() {
    this.users = new Array();
    // console.log("this.title ="+this.title);
    // console.log("this.users =");
    // console.log(this.users);

    // console.log("Selected users array length: ");
    // console.log(this.selectedUsers.length);
    this.selectedUsers.forEach((u) => {
      // console.log("u =");
      // console.log(u);
      this.users.push(u);
    });
    // console.log("users array length: ");
    // console.log(this.users.length);
    // console.log(this.users);
    // console.log("current user's firebase uid ="+this.chatService.currentUserIdFromFirebaseSetFromHomePage);

    this.chatService.createGroup(this.title, this.users).then((res) => {
      console.log("group created");
      // console.log("res");
      // console.log(res);
      // console.log(res.values);
      // this.router.navigateByUrl('/tasktracker/group-chat');
      this.navCtrl.navigateRoot(`/chat/${this.chatService.groupId}`);
    });
    this.users = [];
    this.selectedUsers = [];
    this.title = "";
    //this.navCtrl.navigateRoot(["/tasktracker/group-chat"]);
  }

  back() {
    this.navCtrl.back();
  }
  reset() {
    this.listOfUsers = [];
    this.currentUserEmail = this.chatService.currentUser.email;
    this.users = [];
    this.selectedUsers = [];

    // this.participant = "";
    // this.participant1 = "";
    this.title = "";
  }
  ionViewWillLeave()
  {
    this.reset();
  }
  ngOnDestroy() {
    this.reset();
  }
}