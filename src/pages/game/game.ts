import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {StoryService} from "./story.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {StoryItem, StoryItemType} from "./story";
import {Character, CharacterTag} from "./character";
import {ParserService} from "./parser.service";
import {StorageService} from "../../app/storage.service";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('1s ease-out', style({opacity: '1'})),
      ]),
    ])
  ]
})
export class GamePage {

  storyItemTypes = StoryItemType; // required to make enum available on page

  character: Character;
  info: Boolean = true;
  items: StoryItem[] = [];

  constructor(public navCtrl: NavController,
              private storyService: StoryService,
              private parserService: ParserService,
              private storageService: StorageService) {
    storageService.load().then((character) => {
      this.character = character;

      if (this.character == null)
        this.character = new Character;

      this.next();
    });
  }

  tapNext() {
    let storyItemType = this.items[this.items.length - 1].type;
    if (storyItemType === StoryItemType.NARRATIVE ||
      storyItemType === StoryItemType.DIALOGUE ||
      storyItemType === StoryItemType.CHAPTER) {
      this.next();
    }
  }

  next() {
    const nextItem = this.getUntilRequirementsMet();
    if (this.items.length > 0 && nextItem.type != this.items[this.items.length - 1].type) {
      this.items = [];
      this.storageService.save(this.character);
    }

    this.items.push(nextItem);

    if (this.info && this.items.length > 1)
      this.info = false;
  }

  makeChoice(choice: string) {
    this.character.tags.push(CharacterTag[choice.toUpperCase()]);
    this.next();
  }

  parse(text: string): string {
    return this.parserService.parse(text, this.character);
  }

  private getUntilRequirementsMet(): StoryItem {
    const nextItem = this.storyService.get(this.character.index++);
    if (this.conditionsMet(nextItem)) {
      return nextItem;
    } else {
      return this.getUntilRequirementsMet();
    }
  }

  private conditionsMet(item: StoryItem): Boolean {
    for (let requirement of item.requirements) {
      if (this.character.tags.indexOf(requirement) == -1) {
        return false;
      }
    }
    return true;
  }
}
