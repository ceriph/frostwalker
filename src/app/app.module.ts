import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatsPage} from '../pages/stats/stats';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StoryService} from "../pages/game/story.service";
import {AnimationService} from "css-animator";
import {GamePage} from "../pages/game/game";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IonicStorageModule} from "@ionic/storage";
import {ParserService} from "../pages/game/parser.service";
import {SettingsPage} from "../pages/settings/settings";
import {StorageService} from "./storage.service";
import {NativeAudio} from "@ionic-native/native-audio";
import {MyHammerConfig} from "./gestures";

@NgModule({
  declarations: [
    MyApp,
    StatsPage,
    ContactPage,
    HomePage,
    TabsPage,
    GamePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatsPage,
    ContactPage,
    HomePage,
    TabsPage,
    GamePage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StoryService,
    ParserService,
    StorageService,
    AnimationService,
    NativeAudio,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
