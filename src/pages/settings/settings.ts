import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {StorageService} from "../../app/storage.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private storageService: StorageService) {

  }

  reset() {
    this.confirmReset();
  }

  private confirmReset() {
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
            this.storageService.reset();
          }
        }
      ]
    });
    alert.present().then();
  }
}
