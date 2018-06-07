import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StoryService} from "../pages/game/story.service";
import {AnimatesDirective, AnimationService} from "css-animator";
import {GamePage} from "../pages/game/game";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IonicStorageModule} from "@ionic/storage";
import {ParserService} from "../pages/game/parser.service";
import {StorageService} from "./storage.service";
import {SettingsPage} from "../pages/settings/settings";
import {Storage} from "@ionic/storage"

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GamePage,
    AnimatesDirective
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
    AboutPage,
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
    Storage,
    StorageService,
    AnimationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
