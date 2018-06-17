import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {StoryService} from "./story.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {StoryItem, StoryItemType} from "./story";
import {Character} from "./character";
import {ParserService} from "./parser.service";
import {StorageService} from "../../app/storage.service";
import {NativeAudio} from "@ionic-native/native-audio";
import {Sounds} from "./sounds";

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
              private nativeAudio: NativeAudio,
              private platform: Platform,
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
      this.nativeAudio.play(Sounds.tap.id).then();
      this.next();
    }
  }

  makeChoice(choice: string) {
    this.character.choices.push(choice.toUpperCase());
    this.next();
  }

  parse(text: string): string {
    return this.parserService.parse(text, this.character);
  }

  swipe(event) {
    if (event.direction === 2) {
      console.log("Swipe!")
    }
  }

  private next() {
    const nextItem = this.getUntilRequirementsMet();
    if (this.requiresNewScreen(nextItem)) {
      this.items = [];
      this.storageService.save(this.character);
    }

    this.items.push(nextItem);

    if (this.info && this.items.length > 1)
      this.info = false;
  }

  private requiresNewScreen(storyItem: StoryItem): boolean {
    const currentStoryItem = this.items[this.items.length - 1];
    return (this.items.length > 0 &&
      (this.isInteractive(storyItem) || this.isInteractive(currentStoryItem) || this.items.length == 3))
  }

  private isInteractive(storyItem: StoryItem): boolean {
    return storyItem.type === StoryItemType.CHAPTER ||storyItem.type === StoryItemType.CHOICE || storyItem.type === StoryItemType.NAME;
  }

  private getUntilRequirementsMet(): StoryItem {
    const nextItem = this.storyService.getItem(this.character.index++);
    if (this.conditionsMet(nextItem)) {
      return nextItem;
    } else {
      return this.getUntilRequirementsMet();
    }
  }

  private conditionsMet(item: StoryItem): Boolean {
    for (let requirement of item.requirements) {
      if (this.character.choices.indexOf(requirement) == -1) {
        return false;
      }
    }
    return true;
  }
}
