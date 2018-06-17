import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {NativeAudio} from "@ionic-native/native-audio";
import {Sounds} from "../pages/game/sounds";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private nativeAudio: NativeAudio) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeAudio.preloadComplex(Sounds.tap.id, Sounds.tap.path, 0.1, 1, 0).then();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
