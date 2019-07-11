import {Component} from '@angular/core';
import {StoryService} from "../game/story.service";
import {StorageService} from "../../app/storage.service";
import {Character} from "../game/character";

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  character: Character;
  progress: number;

  constructor(private storyService: StoryService,
              private storageService: StorageService) {

    storageService.load().then(character => {
      this.character = character;
      this.progress = Math.floor((this.character.index / storyService.count()) * 100);
    });
  }

}
