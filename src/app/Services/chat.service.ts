import { Injectable } from "@angular/core";
import { UsersService } from "src/app/Services/users.service";
import { AuthService } from "src/app/Services/authService.service";
import { User } from "../Models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from "@angular/fire/storage";
import { forkJoin, Observable } from "rxjs";
import { take, map } from "rxjs/operators";
// import { firebase } from '@firebase/app';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(
    public usrServ: UsersService,
    private auth: AuthService,
    public db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  usersList = this.usrServ.usersList;
  currentUser = this.auth.getLoggedUser();
  listOfGroups = [];
  currentUserIdFromFirebaseSetFromHomePage = "";
  currentUserIdFromFireabase = JSON.parse(
    localStorage.getItem("clientIdFirebase")
  );
  groupId: any;

  fromChatService() {
    try {
      // console.log("fromChatService");
      // console.log(this.usersList);
      this.usrServ.usersList.forEach((user) => {
        // console.log("user");
        // console.log(user["email"]);
      });
    } catch (err) {
      console.log(err);
    }
  }

  getAllUsers() {
    try {
      return this.db.collection("usersTaskTracker").snapshotChanges();
    } catch (err) {
      console.log(err);
    }
  }

  getCurrentUser() {
    // console.log("currentUser =" + this.currentUser);
    // console.log("current user's email =" + this.currentUser.email);
    // console.log("firebase id for this user");
  }

  findUser(email) {
    try {
      let user = this.db
        .collection("usersTaskTracker", (ref) =>
          ref.where("email", "==", email)
        )
        .valueChanges({ idField: "id" })
        .pipe(take(1));
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  getAllGroups2() {
    try {
      return this.db
        .collection(
          `usersTaskTracker/${this.currentUserIdFromFirebaseSetFromHomePage}/groups`
        )
        .snapshotChanges();
    } catch (err) {
      console.log(err);
    }
  }

  createGroup(title, users) {
    try {
      let current = {
        email: this.currentUser.email,
        id: this.currentUserIdFromFirebaseSetFromHomePage,
        userName: this.currentUser.userName,
      };
      // console.log("additional user(s) is/are: ");
      // console.log(users);
      let allUsers = [current];
      allUsers.push(...users);
      // console.log("allUsers for group chat");
      // console.log(allUsers);

      return this.db
        .collection("groupsTaskTracker")
        .add({
          title: title,
          type: "group",
          users: allUsers,
        })
        .then((res) => {
          this.groupId = res.id;
          let promises = [];
          for (let usr of allUsers) {
            // console.log("usr =");
            // console.log(usr);
            // console.log("usr.id ="+usr.id);
            // console.log("res.id ="+res.id);
            let oneAdd = this.db
              .collection(`usersTaskTracker/${usr.id}/groups`)
              .add({
                id: res.id,
                title: title,
                users: allUsers.length,
                type: "group",
              });
            promises.push(oneAdd);
          }
          return Promise.all(promises);
        });
    } catch (err) {
      console.log(err);
    }
  }

  findGroupById(id) {
    try {
      let group = this.db
        .doc(`groupsTaskTracker/${id}`)
        .snapshotChanges()
        .pipe(take(1));
      return group;
    } catch (err) {
      console.log(err);
    }
  }

  getOneGroup(id, user_group_key = null) {
    try {
      // console.log("firebase created current user's id");
      // console.log(this.auth.currentUserId);
      return this.db
        .doc(`groupsTaskTracker/${id}`)
        .snapshotChanges()
        .pipe(
          take(1),
          map((changes) => {
            let count = 0;
            const data = changes.payload.data();
            this.db
              .collection(`groupsTaskTracker/${id}/messages`)
              .snapshotChanges()
              .forEach((result) => {
                result.forEach((r) => {
                  // console.log("r ="+r);
                  //Get firebase created id of each messsage: r.payload.doc.id
                  const mId = r.payload.doc.id;
                  const uId = r.payload.doc.data()["from"];
                  // setTimeout(() => {
                  //   // console.log("mId ="+mId);
                  // }, 1000);
                  if (
                    r.payload.doc.data()["readFlag"] == false &&
                    uId != this.currentUserIdFromFirebaseSetFromHomePage
                  ) {
                    count = count + 1;
                  }
                });
              });

            const group_id = changes.payload.id;
            // console.log("count");
            // console.log(count);
            return { user_group_key, id: group_id, ...(data as {}) };
          })
        );
    } catch (err) {
      console.log(err);
    }
  }

  getChatMessages(groupId) {
    try {
      let count = 0;

      return this.db
        .collection(`groupsTaskTracker/${groupId}/messages`, (ref) =>
          ref.orderBy("createdAt")
        )
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...(data as {}) };
            })
          )
        );
    } catch (err) {
      console.log(err);
    }
  }

  addChatMessage(msg, chatId) {
    try {
      return this.db
        .collection("groupsTaskTracker/" + chatId + "/messages")
        .add({
          msg: msg,
          from: this.currentUserIdFromFirebaseSetFromHomePage,
          readFlag: false,
          unreadCount: 0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
      console.log(err);
    }
  }

  addFileMessage(file, chatId) {
    try {
      let newName = `${new Date().getTime()}-${
        this.currentUserIdFromFirebaseSetFromHomePage
      }.png`;
      let storageRef: AngularFireStorageReference = this.storage.ref(
        `/files/${chatId}/${newName}`
      );

      return {
        task: storageRef.putString(file, "base64", {
          contentType: "image/png",
        }),
        ref: storageRef,
      };
    } catch (err) {
      console.log(err);
    }
  }

  saveFileMessage(filepath, chatId) {
    try {
      return this.db
        .collection("groupsTaskTracker/" + chatId + "/messages")
        .add({
          file: filepath,
          from: this.currentUserIdFromFirebaseSetFromHomePage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
      console.log(err);
    }
  }
}
