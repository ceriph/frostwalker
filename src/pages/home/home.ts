import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ThemeService} from "../../app/theme.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private themeService: ThemeService) {
  }

  ionViewWillEnter() {
    this.themeService.update(this.themeService.get());
  }


  continue() {
    this.navCtrl.parent.select(1);
  }
}
