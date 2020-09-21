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

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Camera } from '@ionic-native/camera/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
//import { TextAvatarDirective } from './directives/text-avatar.directive';
// import { SubTaskComponent } from "./Components/sub-task/sub-task.component";
// import { ExpandableComponent } from "./Components/expandable/expandable.component";
@NgModule({
  declarations: [AppComponent, HeaderComponent, ],
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // FirestoreSettingsToken,
    AngularFireStorageModule

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
    ReportService,    Camera,
    //  { provide: Camera, useClass: CameraMock },
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
