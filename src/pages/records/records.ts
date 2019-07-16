import {Component} from '@angular/core';
import {StoryService} from "../game/story.service";
import {StorageService} from "../../app/storage.service";
import {Character} from "../game/character";
import {Option, Story} from "../game/story";

@Component({
  selector: 'page-records',
  templateUrl: 'records.html'
})
export class RecordsPage {

  options: Option[];
  character: Character;
  progress: number;

  constructor(private storyService: StoryService,
              private storageService: StorageService) {
  }

  ionViewWillEnter() {
    console.log("Loading Records tab");
    this.character = this.storageService.get();
    this.progress = Math.floor((this.character.index / this.storyService.count()) * 100);
    this.options = this.storyService.getOptions();

    this.options = this.options.filter((option) => this.character.choices.indexOf(option.name) != -1)
  }
}
