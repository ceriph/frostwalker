import {Story, StoryItem} from "./story";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StoryService {

  ready: boolean = false;
  story: Story;

  constructor(private http: HttpClient) {  // Make the HTTP request:
  }

  load() {
    console.log("Loading story...");
    this.http.get('assets/data.json').subscribe(data => {
      this.story = <Story>data;
      console.log("Loaded story data");
      this.ready = true;
    });
  }

  get(): Story {
    return this.story;
  }

  getItem(item: number): StoryItem {
    console.log("Getting item", item);
    return this.story.items[item];
  }

  count(): number {
    return this.story.items.length;
  }
}
