import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

import {TabsPage} from '../pages/tabs/tabs';
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {Sounds} from "../pages/game/sounds";
import {StoryService} from "../pages/game/story.service";
import {StorageService} from "./storage.service";
import {Data, MOOD_PREFIX, Themes} from "../pages/game/character";
import {ThemeService} from "./theme.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  theme: string = Themes.darkNeutral;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private nativeAudio: NativeAudio,
              private storyService: StoryService,
              private storageService: StorageService,
              private themeService: ThemeService) {

    document.addEventListener(ThemeService.onThemeChangeEvent, () => {
      const newTheme = this.themeService.get();
      console.log("Changed theme to", newTheme);
      this.theme = newTheme.replace(MOOD_PREFIX + "-", "");
    });

    platform.ready().then(() => {
      this.nativeAudio.preloadComplex(Sounds.tap.id, Sounds.tap.path, 0.1, 1, 0).then(MyApp.onSoundLoad, MyApp.onSoundError);

      // init data
      this.storageService.init().then((data) => {
        console.log("Loaded data", data);
        this.storageService.set(JSON.parse(data));
        if(this.storageService.getData() == null) {
          this.storageService.saveData(new Data())
        }

        this.themeService.init();

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
