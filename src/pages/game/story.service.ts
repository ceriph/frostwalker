import {Mood, Option, Story, StoryItem} from "./story";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StoryService {

  story: Story;
  mood: Mood;

  constructor(private http: HttpClient) {  // Make the HTTP request:
  }

  init(): Observable<Story> {
    console.log("Loading story...");
    return <Observable<Story>>this.http.get('assets/data.json');
  }

  set(story: Story) {
    this.story = story;
  }

  getOptions(): Option[] {
    return this.story.options;
  }

  getItem(item: number): StoryItem {
    console.log("Getting item", item);
    let storyItem = this.story.items[item];
    if(storyItem.mood)
      this.mood = storyItem.mood;

    return storyItem;
  }

  // sets the mood to be the last known mood
  initMood(item: number) {
    let i = item;
    while(!this.mood && i >= 0) {
      this.getItem(i);
      i--;
    }
  }

  count(): number {
    if(!this.story)
      return 0;

    return this.story.items.length;
  }
}
