import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Components/header/header.component";
import { AuthService } from "./Services/authService.service";
import { UsersService } from "./Services/users.service";
import { TasksService } from "./Services/tasks.service";
import { ReportService } from "./Services/report.service";
import { TaskProgressService } from "./Services/task-progress-service.service";
import { ThemeService } from "./Services/theme-service.service";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AuthService,
    UsersService,
    TasksService,
    ThemeService,
    TaskProgressService,
    ReportService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
