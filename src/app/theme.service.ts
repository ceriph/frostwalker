import {Data, Themes} from "../pages/game/character";
import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";

@Injectable()
export class ThemeService {
  static onThemeChangeEvent = 'onThemeChangeEvent';

  data: Data;

  constructor(private storageService: StorageService) {
  }

  init() {
    this.data = this.storageService.getData();
  }

  update(theme: string) {
    console.log("Updating theme,", theme);
    this.data.theme = theme;
    this.storageService.saveData(this.data);

    const event = new Event(ThemeService.onThemeChangeEvent);
    document.dispatchEvent(event);
  }

  get(): string {
    if(!this.data)
      return Themes.darkWheat;

    return this.data.theme;
  }
}
