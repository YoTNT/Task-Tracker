import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./authService.service";

@Injectable({
  providedIn: "root",
})
export class ActivateGuard implements CanActivate {
  constructor(private authServ: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authServ.isLoggedIn()) return true;
    else {
       this.authServ.redirectToLogin();
      return false;
    }
  }
}
