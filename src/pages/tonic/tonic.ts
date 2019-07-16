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

  constructor(private ad: AdMobPro,
              private storageService: StorageService) {

    this.prepareAd();
    document.addEventListener('onAdDismiss', () => {
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
    this.ad.showRewardVideoAd();
  }
}
