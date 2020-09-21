import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Services/authService.service";
import { ThemeService } from "src/app/Services/theme-service.service";
import { threadId } from "worker_threads";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage implements OnInit {
  constructor(private auth: AuthService, private themeServ: ThemeService) {}
  ngOnInit(): void {
    let us = this.auth.getLoggedUser();
    console.log("TabsPage-ngOnInit-ngOnInit", us);
    if (us) {
      this.auth.userChange.emit(us);
    }
  }
  // enableDarkTheme() {
  //   this.themeServ.enableDarkMode();
  // }
  // enableLightTheme() {
  //   this.themeServ.enableLightMode();
  // }
}
