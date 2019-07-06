import {Story, StoryItem} from "./story";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StoryService {

  story: Story;

  constructor(private http: HttpClient) {  // Make the HTTP request:
    this.http.get('assets/data.json').subscribe(data => this.story = <Story>data);
  }

  get(): Story {
    return this.story;
  }

  getItem(item: number): StoryItem {
    return this.story.items[item];
  }

  count(): number {
    return this.story.items.length;
  }
}
