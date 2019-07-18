import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {RecordsPage} from '../pages/records/records';
import {TonicPage} from '../pages/tonic/tonic';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StoryService} from "../pages/game/story.service";
import {AnimationService} from "css-animator";
import {GamePage} from "../pages/game/game";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IonicStorageModule} from "@ionic/storage";
import {ParserService} from "../pages/game/parser.service";
import {SettingsPage} from "../pages/settings/settings";
import {StorageService} from "./storage.service";
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {MyHammerConfig} from "./gestures";
import {HttpClientModule} from "@angular/common/http";
import {AdMobPro} from "@ionic-native/admob-pro/ngx";
import {ThemeService} from "./theme.service";

@NgModule({
  declarations: [
    MyApp,
    RecordsPage,
    TonicPage,
    HomePage,
    TabsPage,
    GamePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecordsPage,
    TonicPage,
    HomePage,
    TabsPage,
    GamePage,
    SettingsPage
  ],
  providers: [
    AdMobPro,
    StatusBar,
    SplashScreen,
    StoryService,
    ParserService,
    StorageService,
    ThemeService,
    AnimationService,
    NativeAudio,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
