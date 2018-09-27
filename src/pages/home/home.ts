import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {GamePage} from "../game/game";
import {StorageService} from "../../app/storage.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  existingData: boolean = false;

  constructor(public navCtrl: NavController,
              private storageService: StorageService) {

    this.storageService.load().then(result => {
      this.existingData = (result != null);
    })
  }

  continue() {
    this.navCtrl.push(GamePage);
  }
}
