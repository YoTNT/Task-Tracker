import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./authService.service";

@Injectable({
  providedIn: "root",
})
export class ActivateGuard implements CanActivate, CanActivateChild {
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
  }  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
