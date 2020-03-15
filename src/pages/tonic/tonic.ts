import {Component} from '@angular/core';
import {StorageService} from "../../app/storage.service";
import {Character} from "../game/character";
import {AdService} from "../../app/ad.service";

@Component({
  selector: 'page-tonic',
  templateUrl: 'tonic.html'
})
export class TonicPage {

  character: Character;
  showingAd = false;

  constructor(private adService: AdService,
              private storageService: StorageService) {

    document.addEventListener('onAdPresent', (data: any) => {
      if (data.adType == 'rewardvideo' && this.showingAd) {
        this.character.dust++;
        this.storageService.save(this.character);
        this.showingAd = false;
      }
    });
  }

  ionViewWillEnter() {
    this.character = this.storageService.get();
    if (!this.character.dust) {
      this.character.dust = 0;
      this.storageService.save(this.character);
    }
  }

  rewardTonic() {
    this.adService.showReward(() => {
      this.showingAd = true;
    });
  }
}
