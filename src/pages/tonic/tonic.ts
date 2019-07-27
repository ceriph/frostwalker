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

  constructor(private adService: AdService,
              private storageService: StorageService) {

  }

  ionViewWillEnter() {
    this.character = this.storageService.get();
    if (!this.character.tonic) {
      this.character.tonic = 0;
      this.storageService.save(this.character);
    }
  }

  rewardTonic() {
    this.adService.showReward(() => {
      this.character.tonic++;
      this.storageService.save(this.character);
    });
  }
}
