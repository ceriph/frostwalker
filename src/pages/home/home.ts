import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {GamePage} from "../game/game";
import {StorageService} from "../../app/storage.service";
import {StoryService} from "../game/story.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  existingData: boolean = false;

  constructor(public navCtrl: NavController,
              private storageService: StorageService,
              private storyService: StoryService) {

    this.storyService.load(); // load here to make sure it's ready

    this.storageService.load().then(result => {
      this.existingData = (result != null) && result.index != 0;
    })
  }

  continue() {
    this.navCtrl.parent.select(1);
  }
}
