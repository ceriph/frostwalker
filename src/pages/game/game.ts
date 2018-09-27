import {Component} from "@angular/core";
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
  maxItems = 5;
  character: Character;
  items: StoryItem[] = [];
  choice: Choice;
  usedIntuition: boolean = false;

  constructor(private nativeAudio: NativeAudio,
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
    if (!this.isInteractive(this.currentStoryItem())) {
      this.proceed();
    }
  }

  hideTabs() {
    document.querySelector(".tabbar")['style'].display = 'none';
  }

  showTabs() {
    document.querySelector(".tabbar")['style'].display = 'flex';
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

  acceptName() {
    if (this.character.name.length > 0) {
      this.proceed();
    }
  }

  parse(text: string): string {
    return this.parserService.parse(text, this.character);
  }

  // intuit() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Intuition',
  //     message: this.choice.intuition,
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'cancel',
  //         handler: () => {
  //           if (!this.usedIntuition) {
  //             this.character.intuition--;
  //             this.storageService.save(this.character);
  //             this.usedIntuition = true;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present().then();
  // }

  private loadNextItem() {
    const nextItem = this.getUntilRequirementsMet();
    if (this.requiresNewScreen(nextItem)) {
      this.items = [];
      this.storageService.save(this.character);
    }

    if (nextItem.type === StoryItemType.CHOICE) {
      this.choice = Choice.fromString(nextItem.content);
      this.usedIntuition = false;
    }
    this.items.push(nextItem);
  }

  private requiresNewScreen(storyItem: StoryItem): boolean {
    return (this.items.length > 0 &&
      (this.isInteractive(storyItem) || this.isFullScreen(storyItem) || this.isInteractive(this.currentStoryItem()) || this.isFullScreen(this.currentStoryItem()) || this.items.length == this.maxItems))
  }

  private currentStoryItem() {
    return this.items[this.items.length - 1];
  }

  private isInteractive(storyItem: StoryItem): boolean {
    return storyItem.type === StoryItemType.CHOICE || storyItem.type === StoryItemType.NAME;
  }

  private isFullScreen(storyItem: StoryItem): boolean {
    return storyItem.type === StoryItemType.CHAPTER || storyItem.type === StoryItemType.END;
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
