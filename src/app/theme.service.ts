import {Data, MOOD_DARK, MOOD_LIGHT, MOOD_PREFIX, Themes} from "../pages/game/character";
import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {StoryService} from "../pages/game/story.service";

@Injectable()
export class ThemeService {
  static onThemeChangeEvent = 'onThemeChangeEvent';
  static MOOD_DARK_PREFIX = MOOD_PREFIX + "-" + MOOD_DARK;
  static MOOD_LIGHT_PREFIX = MOOD_PREFIX + "-" + MOOD_LIGHT;

  data: Data;

  constructor(private storageService: StorageService, private storyService: StoryService) {
  }

  init() {
    this.data = this.storageService.getData();
  }

  update(theme: string) {
    if(theme === ThemeService.MOOD_DARK_PREFIX) {
      theme = ThemeService.MOOD_DARK_PREFIX + "-" + this.storyService.mood;
    } else if(theme === ThemeService.MOOD_LIGHT_PREFIX) {
      theme = ThemeService.MOOD_LIGHT_PREFIX + "-" + this.storyService.mood;
    }

    console.log("Updating theme,", theme);
    this.data.theme = theme;
    this.storageService.saveData(this.data);

    const event = new Event(ThemeService.onThemeChangeEvent);
    document.dispatchEvent(event);
  }

  updateMood(mood: string) {
    console.log("Updating mood,", mood);
    if (this.isDynamic()) {
      if (this.data.theme.indexOf(MOOD_DARK) != -1) {
        this.update(ThemeService.MOOD_DARK_PREFIX + "-" + mood);
      } else {
        this.update(ThemeService.MOOD_LIGHT_PREFIX + "-" + mood)
      }
    }
  }

  get(): string {
    if (!this.data)
      return Themes.darkNeutral;

    return this.data.theme;
  }

  isDynamic(): boolean {
    return this.data.theme.startsWith(MOOD_PREFIX);
  }
}
