import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();

    this.platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack() && this.router.url !== '' && this.router.url !== '/auth-home') {
        this.routerOutlet.pop();
      } else if (this.router.url === '' || this.router.url === '/auth-home') {
        navigator['app'].exitApp();
      }
    });
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
