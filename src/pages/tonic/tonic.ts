import {Component} from '@angular/core';
import {AdMobPro} from "@ionic-native/admob-pro/ngx";
import {StorageService} from "../../app/storage.service";
import {Character} from "../game/character";

@Component({
  selector: 'page-tonic',
  templateUrl: 'tonic.html'
})
export class TonicPage {

  character: Character;
  showAds: boolean = true;

  constructor(private ad: AdMobPro,
              private storageService: StorageService) {

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
      console.log("Ad dismiss event");
      this.character.tonic++;
      this.storageService.save(this.character);
      this.prepareAd();
    });
  }

  ionViewWillEnter() {
    this.character = this.storageService.get();
    if (!this.character.tonic) {
      this.character.tonic = 0;
      this.storageService.save(this.character);
    }
  }

  prepareAd() {
    console.log("Preparing ad...");
    this.ad.prepareRewardVideoAd({
      // adId: 'ca-app-pub-4458284068451323/1153909851',
      isTesting: true,
      autoShow: false
    }).then(() => console.log("Ad ready"));
  }

  rewardTonic() {
    if(this.showAds) {
      this.ad.showRewardVideoAd();
    } else {
      alert("Ads cannot be loaded at this time");
    }
  }
}
