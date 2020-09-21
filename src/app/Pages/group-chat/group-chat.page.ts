import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChatService } from "src/app/Services/chat.service";
import { forkJoin, Observable, Subject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { take, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-group-chat",
  templateUrl: "./group-chat.page.html",
  styleUrls: ["./group-chat.page.scss"],
})
export class GroupChatPage implements OnDestroy, OnInit {
  constructor(
    public chatService: ChatService,
    public db: AngularFirestore,
    // private router: Router,
    private navCtrl: NavController
  ) {}

  listOfUsers = []; //this list can show all groups using function getAllGroups() from chat service
  currentUserEmail = this.chatService.currentUser.email;
  listOfGroups = this.chatService.listOfGroups;
  listOfGroups2 = [];
  currentFirebaseUserId = this.chatService
    .currentUserIdFromFirebaseSetFromHomePage;
  // currentFirebaseUserId = this.chatService.currentUserIdFromFireabase;
  titleCheck = "";
  groupId: any;
  participant = "";
  users = [];
  private ngUnsubscribe = new Subject();

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
      //this gets a list of all groups created by this user (groups for group chat only)
      this.getAllUserGroups();
    }, 2000);

  }


  getAllUsers() {
    this.listOfUsers = new Array();
    this.chatService.getAllUsers().pipe(take(1)).subscribe((result) => {
      // console.log("getting list of all users");
      result.forEach((r) => {
        if (
          r.payload.doc.data()["email"] != this.chatService.currentUser.email
        ) {
          this.listOfUsers.push(r);
        }
      });
    });
  }
  getAllUserGroups() {
    try {
     //get all groups for group chats
      this.listOfGroups2 = new Array();
      // console.log("listOfGroups2 =");
      // console.log(this.listOfGroups2);

      this.listOfGroups2.forEach((item) =>{
        // console.log("item");
        // console.log(item.payload.doc.data());
      });
      this.chatService.getAllGroups2().pipe(take(1)).subscribe((result) => {
        result.forEach((r) => {
          if (r.payload.doc.data()["type"] == "group") {
            // console.log("group id="+r.payload.doc.id);
              // if(this.listOfGroups2.find(item =>item.payload.doc.data()['id'] == r.payload.doc.id)) {
              //   console.log("found similar id ="+r.payload.doc.id);
              // } else {
              //   console.log("not found...pushing...");
              //    this.listOfGroups2.push(r);
              // }
            this.listOfGroups2.push(r);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }

  }

  //swipe down to refresh
  loading: boolean;
  async doRefresh(event) {
    this.loading = true;
    let errmessage = "";
    await new Promise(() => {
      console.log("Begin async operation");
      setTimeout(() => {
        try {
          this.getAllUsers();
          this.getAllUserGroups();
          console.log("Async operation has ended");
          event.target.complete();
          this.loading = false;
        } catch (err) {
          this.loading = false;
          console.log(err);
        }
      }, 2000);
    }).catch((error) => console.log(error));
  }
  GroupChat(id, title) {
    // console.log("group id passed ="+id);
    // console.log("current user's id in firebase ="+this.currentFirebaseUserId);
    let obs2 = this.chatService.findGroupById(id);
    forkJoin(obs2).subscribe((res) => {
      // console.log("res");
      // console.log(res);
      for (let data of res) {
        // console.log("data");
        // console.log(data.payload.id);
        this.navCtrl.navigateRoot(`/chat/${data.payload.id}`);
        //use following if passing 2 parameters
        // this.router.navigateByUrl(`/chat/${data.payload.id}/${this.currentFirebaseUserId}`);
      }
      // for (let data of res) {
      //   if (data.length > 0) {
      //     console.log("found an existing group with this group id ="+data[0].id);
      //     this.groupId = data[0].id;
      //     this.router.navigateByUrl(`/chat/${this.groupId}`);
      //   }
      // }
    });
  }

  //---------one on one chat
  oneOnOneChat(email1, userName2) {
    //creating group name--------------------------------- stored in this.titleCheck (ordered alphabatically from both users' nickname)
    let userName1 = this.chatService.currentUser.userName;
    let x = userName1.localeCompare(userName2, undefined, {
      numeric: true,
      sensitivity: "base",
    });
    if (x == -1) {
      // console.log("userName1 will come first");
      this.titleCheck = "oOc_" + userName1 + "&" + userName2;
      console.log("this.titlecheck =" + this.titleCheck);
    } else {
      // console.log("userName2 will come first");
      this.titleCheck = "oOc_" + userName2 + "&" + userName1;
      console.log("this.titlecheck =" + this.titleCheck);
    }

    let obs1 = this.findGroup(this.titleCheck);
    forkJoin(obs1).subscribe((res) => {
      for (let data of res) {
        if (data.length > 0) {
          console.log(
            "found an existing group with this group id =" + data[0].id
          );
          this.groupId = data[0].id;
          this.navCtrl.navigateRoot(`/chat/${this.groupId}`);
        } else {
          console.log("group not found--in create group section"); //group not available--create group
          setTimeout(() => {
            this.addUser(email1);
            console.log(this.users);
            // this.readyToCreateOneOnOneGroup();
            // this.groupId  is assigned with new group id in createGroup
          }, 1000);
          setTimeout(() => {
            this.readyToCreateOneOnOneGroup();
            // this.groupId  is assigned with new group id in createGroup()
          }, 2000);
        }
      }
    });
  }

  findGroup(title) {
    let group = this.db
      .collection("groupsTaskTracker", (ref) => ref.where("title", "==", title))
      .valueChanges({ idField: "id" })
      .pipe(take(1));
    return group;
  }

  addUser(participant1) {
    this.participant = participant1;
    let obs = this.chatService.findUser(this.participant);
    forkJoin(obs).subscribe((res) => {
      for (let data of res) {
        if (data.length > 0) {
          if (this.users.indexOf(data[0]) > -1) {
          } else {
            this.users.push(data[0]);
          }
        }
      }
      this.participant = "";
    });
  }

  readyToCreateOneOnOneGroup() {
    this.createGroup(this.titleCheck, this.users).then((res) => {
      console.log("group created");
      // this.router.navigateByUrl('/chats');
      this.navCtrl.navigateRoot(`/chat/${this.groupId}`);
    });
    this.users = [];
  }

  createGroup(title, users) {
    let current = {
      email: this.chatService.currentUser.email,
      id: this.chatService.currentUserIdFromFirebaseSetFromHomePage,
      userName: this.chatService.currentUser.userName,
    };
    let allUsers = [current];
    allUsers.push(...users);
    return this.db
      .collection("groupsTaskTracker")
      .add({
        title: title,
        type: "OneOnOne",
        users: allUsers,
      })
      .then((res) => {
        // console.log("new group's id ="+res.id);
        this.groupId = res.id;
        let promises = [];
        for (let usr of allUsers) {
          let oneAdd = this.db
            .collection(`usersTaskTracker/${usr.id}/groups`)
            .add({
              id: res.id,
              type: "OneOnOne",
            });
          promises.push(oneAdd);
        }
        return Promise.all(promises);
      });
  }

  ngOnDestroy() {
    console.log("ngOnDestroy() executed");
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}