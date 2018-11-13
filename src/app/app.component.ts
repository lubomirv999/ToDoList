import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    firebase.initializeApp({
      apiKey: "AIzaSyCmlTy-0YBU0JS-4IKfK3IAZVRoGrGv10Q",
      authDomain: "todolist-42b37.firebaseapp.com",
      databaseURL: "https://todolist-42b37.firebaseio.com"
    });
  }
}
