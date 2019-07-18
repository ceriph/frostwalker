import {Component} from "@angular/core";
import {StoryService} from "./story.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {Choice, StoryItem, StoryItemType} from "./story";
import {Character} from "./character";
import {ParserService} from "./parser.service";
import {StorageService} from "../../app/storage.service";
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {Sounds} from "./sounds";
import {AdMobPro} from "@ionic-native/admob-pro/ngx";
import {AlertController} from "ionic-angular";

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
  maxItems = 3;
  character: Character;
  items: StoryItem[] = [];
  choice: Choice;
  showAds: boolean = true;

  constructor(private nativeAudio: NativeAudio,
              private ad: AdMobPro,
              private storyService: StoryService,
              private parserService: ParserService,
              private storageService: StorageService,
              private alertCtrl: AlertController) {

    this.prepareAd();
    document.addEventListener('onAdLoaded', () => {
      console.log("Ad loaded event");
      this.showAds = true;
    });
    document.addEventListener('onAdFailLoad', () => {
      console.log("Ad failed event");
      this.showAds = false;
    });
    document.addEventListener('onAdDismiss', () => {
      console.log("Ad dismiss event");
      this.prepareAd();
    });

    this.character = this.storageService.get();
    if (this.character == null)
      this.character = new Character;

    this.loadNextItem();
  }

  ionViewWillEnter() {
    if(this.storageService.get() !== this.character) {
      this.character = this.storageService.get();
      this.items = [];
      this.loadNextItem();
    }
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
    if(choice.startsWith('TONIC')) {
      this.character.tonic--;
    }
    this.character.choices.push(choice.toUpperCase());
    this.proceed();
  }

  acceptName() {
    if (this.character.name.length > 0) {
      let alert = this.alertCtrl.create({
        title: 'Confirm Name',
        message: "Chosen name is '" + this.character.name + "', confirm?",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.proceed();
            }
          }
        ]
      });
      alert.present().then();
    }
  }

  parse(text: string): string {
    return this.parserService.parse(text, this.character);
  }

  private loadNextItem() {
    const nextItem = this.getUntilRequirementsMet();
    if (this.requiresNewScreen(nextItem)) {
      this.items = [];
      this.storageService.save(this.character);
    }

    if (nextItem.type === StoryItemType.CHOICE) {
      this.choice = Choice.fromString(nextItem.content);
    }

    console.log(nextItem.type, nextItem.content);
    this.items.push(nextItem);
  }

  prepareAd() {
    console.log("Preparing ad...");
    this.ad.prepareInterstitial({
      // adId: 'ca-app-pub-4458284068451323/1153909851',
      isTesting: true,
      autoShow: false
    }).then(() => console.log("Ad ready"))
  }

  showAd() {
    if(this.showAds) {
      console.log("Showing ad");
      this.ad.showInterstitial();
      this.proceed();
    } else {
      alert("Couldn't init ad, continuing anyway...");
      this.proceed();
      this.prepareAd();
    }
  }

  chapterTitle(content: String): String {
    return content.split('|')[0];
  }

  chapterContent(content: String): String {
    return content.split('|')[1];
  }

  private requiresNewScreen(storyItem: StoryItem): boolean {
    return (this.items.length > 0 &&
      (this.isInteractive(storyItem) || this.isFullScreen(storyItem) || this.isInteractive(this.currentStoryItem()) || this.isFullScreen(this.currentStoryItem()) || this.items.length == this.maxItems))
  }

  private currentStoryItem() {
    return this.items[this.items.length - 1];
  }

  private isInteractive(storyItem: StoryItem): boolean {
    return storyItem.type === StoryItemType.CHOICE || storyItem.type === StoryItemType.NAME || storyItem.type === StoryItemType.CHAPTER_END;
  }

  private isFullScreen(storyItem: StoryItem): boolean {
    return storyItem.type === StoryItemType.CHAPTER || storyItem.type === StoryItemType.END || storyItem.type === StoryItemType.CHAPTER_END;
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
