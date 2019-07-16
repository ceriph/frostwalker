import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

import {TabsPage} from '../pages/tabs/tabs';
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {Sounds} from "../pages/game/sounds";
import {StoryService} from "../pages/game/story.service";
import {StorageService} from "./storage.service";
import {Character} from "../pages/game/character";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private nativeAudio: NativeAudio,
              private storyService: StoryService,
              private storageService: StorageService) {

    platform.ready().then(() => {
      this.nativeAudio.preloadComplex(Sounds.tap.id, Sounds.tap.path, 0.1, 1, 0).then(MyApp.onSoundLoad, MyApp.onSoundError);

      // load data
      this.storageService.init().then((character) => {
        console.log("Loaded character data", character);
        this.storageService.set(JSON.parse(character));
        if(this.storageService.get() == null)
          this.storageService.set(new Character());

        this.storyService.init().subscribe(story => {
          console.log("Loaded story data", story);
          this.storyService.set(story);

          // Everything is ready
          statusBar.hide();
          splashScreen.hide();
        })
      });
    });
  }

  private static onSoundLoad(result) {
    console.log("Sound loaded:", result);
  }

  private static onSoundError(result) {
    console.log("Error loading sound:", result)
  }
}
