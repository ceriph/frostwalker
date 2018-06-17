import {Component} from "@angular/core";
import {Alert, AlertController, NavController} from "ionic-angular";
import {GamePage} from "../game/game";
import {StorageService} from "../../app/storage.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  existingData: boolean = false;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private storageService: StorageService) {

    this.storageService.load().then(result => {
      this.existingData = (result != null);
    })
  }

  continue() {
    this.navCtrl.push(GamePage);
  }

  newGame() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Data Loss',
      message: 'Any existing progress will be lost, are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Reset',
          handler: () => {
            this.storageService.reset();
            this.navCtrl.push(GamePage);
          }
        }
      ]
    });
    alert.present().then();
  }
}
