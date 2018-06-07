import {CharacterTag} from "./character";

export class StoryItem {
  type: StoryItemType;
  requirements: CharacterTag[] = [];
  content: string;
}

export enum StoryItemType {
  NAME, CHAPTER, NARRATIVE, DIALOGUE, CHOICE
}
