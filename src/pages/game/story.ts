export class Story {
  title: string;
  description: string;
  choices: string[];
  items: StoryItem[];
}

export class StoryItem {
  type: StoryItemType;
  requirements: string[] = [];
  content: string;
}

export enum StoryItemType {
  NAME, CHAPTER, NARRATIVE, DIALOGUE, CHOICE, SOUND, T
}
