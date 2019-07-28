import {Data, ThemeMode, Themes} from "../pages/game/character";
import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {StoryService} from "../pages/game/story.service";
import {StoryItem} from "../pages/game/story";

@Injectable()
export class ThemeService {
  static onThemeChangeEvent = 'onThemeChangeEvent';
  static MOOD_PREFIX = 'mood';
  static DARK_PREFIX = 'dark';
  static LIGHT_PREFIX = 'light';
  static MOOD_DARK_PREFIX = ThemeService.MOOD_PREFIX + "-" + ThemeService.DARK_PREFIX;
  static MOOD_LIGHT_PREFIX = ThemeService.MOOD_PREFIX + "-" + ThemeService.LIGHT_PREFIX;

  data: Data;
  mood: string;
  setting: string;

  constructor(private storageService: StorageService,
              private storyService: StoryService) {
  }

  // trigger an init / refresh of the current state (data, mood and setting)
  init() {
    this.data = this.storageService.getData();

    const character = this.storageService.get();
    let i = character.index;
    while ((!this.mood || !this.setting) && i >= 0) {
      const storyItem = this.storyService.getItem(i);
      if (storyItem.mood)
        this.mood = storyItem.mood;

      if (storyItem.setting)
        this.setting = storyItem.setting;

      i--;
    }

    if (this.isDynamic()) {
      this.updateSetting();
      this.updateMood();
    } else {
      this.update(this.data.theme);
    }
  }

  update(theme?: string, themeMode?: ThemeMode) {
    if (themeMode) {
      console.log("Updating theme mode,", themeMode);
      this.data.themeMode = themeMode;
      if (themeMode === ThemeMode.DYNAMIC) {
        theme = this.setting + "-" + this.mood;
      } else if (themeMode === ThemeMode.DYNAMIC_DARK) {
        theme = ThemeService.DARK_PREFIX + "-" + this.mood;
      } else if (themeMode === ThemeMode.DYNAMIC_LIGHT) {
        theme = ThemeService.LIGHT_PREFIX + "-" + this.mood;
      }
    }

    console.log("Updating theme,", theme);
    this.data.theme = theme;
    this.storageService.saveData(this.data);

    const event = new Event(ThemeService.onThemeChangeEvent);
    document.dispatchEvent(event);
  }

  updateSetting(setting?: string) {
    if (setting)
      this.setting = setting;

    console.log("Updating setting,", this.setting);

    if (this.data.themeMode === ThemeMode.DYNAMIC)
      this.update(this.setting + "-" + this.mood);
  }

  updateMood(mood?: string) {
    if (mood)
      this.mood = mood;

    console.log("Updating mood,", this.mood);

    if (this.isDynamic()) {
      if (this.data.themeMode === ThemeMode.DYNAMIC) {
        this.update(this.setting + "-" + this.mood);
      } else if (this.data.themeMode === ThemeMode.DYNAMIC_DARK) {
        this.update(ThemeService.DARK_PREFIX + "-" + this.mood);
      } else {
        this.update(ThemeService.LIGHT_PREFIX + "-" + this.mood)
      }
    }
  }

  get(): string {
    if (!this.data)
      return Themes.darkNeutral;

    return this.data.theme;
  }

  isDynamic(): boolean {
    return this.data.themeMode === ThemeMode.DYNAMIC ||
      this.data.themeMode === ThemeMode.DYNAMIC_DARK ||
      this.data.themeMode === ThemeMode.DYNAMIC_LIGHT;
  }
}
