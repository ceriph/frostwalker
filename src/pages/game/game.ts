import {Component} from "@angular/core";
import {AlertController} from "ionic-angular";
import {StoryService} from "./story.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {Choice, StoryItem, StoryItemType} from "./story";
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
  choice: Choice;
  usedIntuition: boolean = false;

  constructor(private alertCtrl: AlertController,
              private nativeAudio: NativeAudio,
              private storyService: StoryService,
              private parserService: ParserService,
              private storageService: StorageService) {

    storageService.load().then((character) => {
      this.character = character;

      if (this.character == null)
        this.character = new Character;

      this.loadNextItem();
    });
  }

  onTap() {
    let storyItemType = this.items[this.items.length - 1].type;
    if (storyItemType !== StoryItemType.END && (storyItemType === StoryItemType.NARRATIVE || storyItemType === StoryItemType.DIALOGUE || storyItemType === StoryItemType.CHAPTER)) {
      this.proceed();
    }
  }

  proceed() {
    this.nativeAudio.play(Sounds.tap.id).then();
    this.character.index++;
    this.loadNextItem();
  }

  makeChoice(choice: string) {
    this.character.choices.push(choice.toUpperCase());
    this.proceed();
  }

  parse(text: string): string {
    return this.parserService.parse(text, this.character);
  }

  swipe(event) {
    if (event.direction === 2) {
      console.log("Swipe!")
      // todo make this work
    }
  }

  intuit() {
    const alert = this.alertCtrl.create({
      title: 'Intuition',
      message: this.choice.intuition,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            if(!this.usedIntuition) {
              this.character.intuition--;
              this.storageService.save(this.character);
              this.usedIntuition = true;
            }
          }
        }
      ]
    });
    alert.present().then();
  }

  private loadNextItem() {
    const nextItem = this.getUntilRequirementsMet();
    if (this.requiresNewScreen(nextItem)) {
      this.items = [];
      this.storageService.save(this.character);
    }

    if(nextItem.type === StoryItemType.CHOICE) {
      this.choice = Choice.fromString(nextItem.content);
      this.usedIntuition = false;
    }
    this.items.push(nextItem);

    if (this.info && (this.items.length > 1 || this.currentStoryItem().type === StoryItemType.CHOICE || this.currentStoryItem().type === StoryItemType.NAME || this.currentStoryItem().type === StoryItemType.END))
      this.info = false;
  }

  private requiresNewScreen(storyItem: StoryItem): boolean {
    return (this.items.length > 0 &&
      (this.isInteractive(storyItem) || this.isInteractive(this.currentStoryItem()) || this.items.length == 3))
  }

  private currentStoryItem() {
    return this.items[this.items.length - 1];
  }

  private isInteractive(storyItem: StoryItem): boolean {
    return storyItem.type === StoryItemType.CHAPTER || storyItem.type === StoryItemType.CHOICE || storyItem.type === StoryItemType.NAME || storyItem.type === StoryItemType.END;
  }

  private getUntilRequirementsMet(): StoryItem {
    const nextItem = this.storyService.getItem(this.character.index);
    if (this.conditionsMet(nextItem)) {
      return nextItem;
    } else {
      this.character.index++;
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
