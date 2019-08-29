import {Component} from "@angular/core";
import {StoryService} from "./story.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Choice, StoryItem, StoryItemType} from "./story";
import {Character} from "./character";
import {ParserService} from "./parser.service";
import {StorageService} from "../../app/storage.service";
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {Sounds} from "./sounds";
import {AlertController, Platform} from "ionic-angular";
import {ThemeService} from "../../app/theme.service";
import {AdService} from "../../app/ad.service";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('1.5s ease-out', style({opacity: '1'})),
      ]),
    ]),
    trigger('fadeInVisibility', [
      state('hidden', style({
        visibility: 'hidden'
      })),
      state('visible', style({
        visibility: 'inherited'
      })),
      transition('hidden=>visible', [
        style({opacity: '0'}),
        animate('1.5s ease-out', style({opacity: '1'})),
      ]),
      transition('visible=>hidden', [
        style({opacity: '1'}),
        animate('1.5s ease-out', style({opacity: '0'})),
      ]),
    ])
  ]
})
export class GamePage {

  storyItemTypes = StoryItemType; // required to make enum available on page
  maxItems = 4;
  character: Character;
  items: StoryItem[] = [];
  choice: Choice;

  showingAd = false;
  skipAds = false;

  tapping = false;

  constructor(private nativeAudio: NativeAudio,
              private adService: AdService,
              private storyService: StoryService,
              private parserService: ParserService,
              private storageService: StorageService,
              private themeService: ThemeService,
              private alertCtrl: AlertController,
              private platform: Platform) {

    document.addEventListener('onAdPresent', (data: any) => {
      if (data.adType == 'rewardvideo' && this.showingAd) {
        this.proceed();
        this.showingAd = false;
      }
    });

    this.character = this.storageService.get();
    if (this.character == null)
      this.character = new Character;

    this.loadNextItem();
  }

  ionViewWillEnter() {
    console.log("Refreshing game screen", this.themeService.get());
    this.themeService.init();

    if (this.storageService.get() !== this.character) {
      this.character = this.storageService.get();
      this.items = [];
      this.loadNextItem();
    }
  }

  onTap() {
    if(!this.tapping) {
      if (!this.isInteractive(this.currentStoryItem())) {
        this.proceed();
        this.tapping = true;
        setTimeout(() => this.tapping = false, 1500);
      }
    }
  }

  hideTabs() {
    document.querySelector(".tabbar")['style'].display = 'none';
  }

  showTabs() {
    document.querySelector(".tabbar")['style'].display = 'flex';
  }

  proceed() {
    if (this.platform.is('cordova'))
      this.nativeAudio.play(Sounds.tap.id).then();

    this.character.index++;
    this.loadNextItem();
  }

  makeChoice(choice: string) {
    if (choice.startsWith('TONIC')) {
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
    if (this.themeChange(nextItem)) {
      console.log("Shifting to new dynamic theme", nextItem.setting, nextItem.mood);
      this.themeService.updateDynamic(nextItem.setting, nextItem.mood);
      // this.items = [];
      // this.storageService.save(this.character);
    }

    if (this.requiresNewScreen(nextItem)) {
      this.items = [];
      this.storageService.save(this.character);
    }

    if (nextItem.type === StoryItemType.CHOICE) {
      this.choice = Choice.fromString(nextItem.content);
    }

    console.log(nextItem.type, nextItem.content, nextItem.mood, nextItem.setting, nextItem.font);
    this.items.push(nextItem);
  }

  private themeChange(storyItem: StoryItem): boolean {
    return (storyItem.mood && storyItem.mood !== this.themeService.mood) || (storyItem.setting && storyItem.setting !== this.themeService.setting);
  }

  showAd() {
    this.adService.showReward(() => {
      this.showingAd = true;
    });
    if(!this.adService.showAds) {
      console.log("Skipping ads...");
      this.skipAds = true;
    }
  }

  skipAd() {
    this.skipAds = false;
    this.proceed();
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
      console.log("Checking if character has", requirement);
      if (this.character.choices.indexOf(requirement) == -1) {
        return false;
      }
    }
    return true;
  }
}
