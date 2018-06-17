import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StorageService} from "../../app/storage.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              private storageService: StorageService) {

  }

  reset() {
    this.storageService.reset();
  }
}
