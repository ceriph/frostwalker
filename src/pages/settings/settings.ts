import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {StorageService} from "../../app/storage.service";
import {ThemeService} from "../../app/theme.service";
import {Character, Data, MOOD_PREFIX, Themes} from "../game/character";
import {AdService} from "../../app/ad.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  object = Object;
  data: Data;
  themes = Themes;

  testing = true;

  constructor(private alertCtrl: AlertController,
              private adService: AdService,
              private storageService: StorageService,
              private themeService: ThemeService) {
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

  setTheme(theme: string) {
    if (this.themeService.isDynamic() && !theme.startsWith(MOOD_PREFIX)) {
      let alert = this.alertCtrl.create({
        title: 'Confirm Theme Change',
        message: 'Using a fixed theme might lose some immersion, are you sure?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              if (!this.testing)
                this.adService.showInterstitial();

              this.themeService.update(theme);
            }
          }
        ]
      });
      alert.present().then();

    } else {
      if (!this.testing)
        this.adService.showInterstitial();

      this.themeService.update(theme);
    }
  }

  unlockSlot() {
    this.adService.showReward(() => this.data.characters.push(new Character()));
  }

  isSelected(theme: string): boolean {
    if (this.themeService.isDynamic()) {
      return this.themeService.get().startsWith(theme);
    }
    return this.themeService.get() === theme;
  }
}
