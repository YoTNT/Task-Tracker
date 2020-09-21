import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../Models/user";
import { resolve } from "dns";
import { from } from "rxjs";
import { scan, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  usersList = new Array<User>();
  constructor(private http: HttpClient) {
    this.getAllUsers();
  }

  path: string = "https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta";

  async getAllUsers(): Promise<Array<User>> {
    let users = await this.http.get<any>(`${this.path}/id/`).toPromise();
    await users.forEach((u) => {
      this.usersList.push(
        new User(u.id, u.name, u.email, "../assets/avatar.svg")
      );
    });
    console.log("usersList", users);
    console.log("usersAr", this.usersList);
    return this.usersList;
  }
    findUserById(id): User {
    return this.usersList.find((x) => x.userId == id);
  }

  getUserById(id): User {
    let rs = this.http.get<any>(`${this.path}/id/${id}`).toPromise();
    let usr: User = new User();
    rs.then((res) => {
      console.log("res", res);
      usr.userId = res["Items"][0].id.S;
      usr.userName = res["Items"][0].name.S;
      usr.email = res["Items"][0].email.S;
      usr.avatar = "../assets/avatar.svg";
      //  console.log(usr);
      // console.log("res['Items']", res["Items"]);
      // console.log("res['Items'][0] ", res["Items"][0]);
      // console.log("res['Items'][0].id", res["Items"][0].id.S);
    });
    return usr;
  }
  getUserByEmail(email: String): User {
    console.log(this.usersList);
    return this.usersList.find((u) => u.email === email);
  }
}
