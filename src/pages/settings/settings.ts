import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {StorageService} from "../../app/storage.service";
import {ThemeService} from "../../app/theme.service";
import {Character, Data, Themes} from "../game/character";
import {AdMobPro} from "@ionic-native/admob-pro/ngx";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  data: Data;
  themes = Themes;
  showAds: boolean = true;

  constructor(private alertCtrl: AlertController,
              private ad: AdMobPro,
              private storageService: StorageService,
              private themeService: ThemeService) {

    this.prepareAd();
    document.addEventListener('onAdLoaded', () => {
      console.log("Ad loaded event");
      this.showAds = true;
    });
    document.addEventListener('onAdFailLoad', () => {
      console.log("Ad failed event");
      this.showAds = false;
    });
    document.addEventListener('onAdDismiss', () => {
      console.log("Ad dismissed event");
      this.prepareAd()
    });
  }

  ionViewWillEnter() {
    this.data = this.storageService.getData();
  }

  reset(slot: number) {
    this.confirmReset(slot);
  }

  load(slot: number) {
    this.data.lastLoaded = slot;
    this.storageService.saveData(this.data);
  }

  private confirmReset(slot: number) {
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

  setTheme(theme: string) {
    if (this.showAds)
      this.ad.showInterstitial();

    this.themeService.update(theme);
  }

  unlockSlot() {
    if(this.showAds)
      this.ad.showRewardVideoAd();

    this.data.characters.push(new Character());
    this.prepareAd();
  }

  prepareAd() {
    console.log("Preparing ad...");
    this.ad.prepareInterstitial({
      // adId: 'ca-app-pub-4458284068451323/1153909851',
      isTesting: true,
      autoShow: false
    }).then(() => console.log("Ad ready"))
  }

  isSelected(theme: string): boolean {
    return this.themeService.get() === theme;
  }
}
