import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginRegisterPage } from '../pages/login-register/login-register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;
  loginPage: any = LoginRegisterPage;
  @ViewChild('myNav') nav: NavController; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      const userId = await storage.get('userId');
      const isAdmin = await storage.get('isAdmin');
      if (userId) {
        this.nav.setRoot(TabsPage);
      } else {
        this.nav.setRoot(this.loginPage);
      }
    });
  }
}
