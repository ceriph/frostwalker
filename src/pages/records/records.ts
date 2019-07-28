import {Component} from '@angular/core';
import {StoryService} from "../game/story.service";
import {StorageService} from "../../app/storage.service";
import {Character, Data} from "../game/character";
import {Option} from "../game/story";

@Component({
  selector: 'page-records',
  templateUrl: 'records.html'
})
export class RecordsPage {

  options: Option[];
  data: Data;
  character: Character;
  completion: number;

  constructor(private storyService: StoryService,
              private storageService: StorageService) {
  }

  ionViewWillEnter() {
    console.log("Loading Records tab");
    this.character = this.storageService.get();
    this.data = this.storageService.getData();
    this.options = this.storyService.getOptions().filter((option) => this.character.choices.indexOf(option.name) != -1);

    this.completion = this.getCompletion();
  }

  getProgress(character: Character): number {
    return Math.floor((character.index / this.storyService.count()) * 100);
  }

  getCompletion(): number {
    const choices = [];
    this.data.characters.forEach((character) => {
      character.choices.forEach((choice) => {
        if(choices.indexOf(choice) === -1)
          choices.push(choice);
      });
    });
    return Math.floor((choices.length / this.storyService.getOptions().length) * 100);
  }
}
