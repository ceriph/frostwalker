import {Mood, Option, Story, StoryItem} from "./story";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StoryService {

  story: Story;

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
    return this.story.items[item];
  }

  count(): number {
    if(!this.story)
      return 0;

    return this.story.items.length;
  }
}
