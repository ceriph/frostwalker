import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {StorageService} from "../../app/storage.service";
import {ThemeService} from "../../app/theme.service";
import {Character, Data, ThemeMode, Themes} from "../game/character";
import {AdService} from "../../app/ad.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  object = Object;
  data: Data;
  themes = Themes;
  modes = ThemeMode;

  testing = true;

  constructor(private alertCtrl: AlertController,
              private adService: AdService,
              private storageService: StorageService,
              private themeService: ThemeService) {
    this.data = this.storageService.getData();
  }

  ionViewWillEnter() {
    this.data = this.storageService.getData();
  }

  reset(slot: number) {
    console.log("Resetting slot", slot);
    let alert = this.alertCtrl.create({
      title: 'Confirm Data Loss',
      message: 'Any existing progress will be lost, are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Reset',
          handler: () => {
            this.storageService.reset(slot);
          }
        }
      ]
    });
    alert.present().then();
  }

  load(slot: number) {
    console.log("Loading slot", slot);
    this.data.lastLoaded = slot;
    this.storageService.saveData(this.data);
  }

  setTheme(themeMode: ThemeMode, theme?: string) {
    if (this.themeService.isDynamic() && themeMode === ThemeMode.STATIC) {
      let alert = this.alertCtrl.create({
        title: 'Confirm Theme Change',
        message: 'Using a fixed theme might lose some immersion, are you sure?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Confirm',
            handler: () => this.updateTheme(themeMode, theme)
          }
        ]
      });
      alert.present().then();

    } else {
      this.updateTheme(themeMode, theme);
    }
  }

  private updateTheme(themeMode: ThemeMode, theme?: string) {
    if (!this.testing)
      this.adService.showInterstitial();

    this.themeService.update(theme, themeMode);
  }

  unlockSlot() {
    this.adService.showReward(() => this.data.characters.push(new Character()));
  }

  isSelected(theme: string): boolean {
    if (this.themeService.isDynamic()) {
      return this.data.themeMode === theme;
    }
    return this.themeService.get() === theme;
  }
}
