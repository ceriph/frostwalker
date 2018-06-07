import {StoryItem, StoryItemType} from "./story";
import {CharacterTag} from "./character";
import {NAME_PARAM} from "./parser.service";

export class StoryService {
  items: StoryItem[] = [
    {
      type: StoryItemType.CHAPTER,
      requirements: [],
      content: "1"
    },
    {
      type: StoryItemType.NARRATIVE,
      requirements: [],
      content: "Somewhere"
    },
    {
      type: StoryItemType.NARRATIVE,
      requirements: [],
      content: "Something"
    },
    {
      type: StoryItemType.NARRATIVE,
      requirements: [],
      content: "Happens"
    },
    {
      type: StoryItemType.NARRATIVE,
      requirements: [],
      content: "A person is there"
    },
    {
      type: StoryItemType.DIALOGUE,
      requirements: [],
      content: "Hello, my name is Jimmy, what's yours?"
    },
    {
      type: StoryItemType.NAME,
      requirements: [],
      content: ""
    },
    {
      type: StoryItemType.DIALOGUE,
      requirements: [],
      content: "Nice to meet you, " + NAME_PARAM + "!"
    },
    {
      type: StoryItemType.DIALOGUE,
      requirements: [],
      content: "Well, not such nice circumstances, I suppose"
    },
    {
      type: StoryItemType.DIALOGUE,
      requirements: [],
      content: "Involved in the fight I take it?"
    },
    {
      type: StoryItemType.CHOICE,
      requirements: [],
      content: "Fighter=I Love Fighting,Thinker=I hate fighting"
    },
    {
      type: StoryItemType.DIALOGUE,
      requirements: [ CharacterTag.FIGHTER ],
      content: "Oh wow, I wish I was that confident!"
    },
    {
      type: StoryItemType.DIALOGUE,
      requirements: [ CharacterTag.THINKER],
      content: "Ah yes, me too, not much of a fighter!"
    },
    {
      type: StoryItemType.NARRATIVE,
      requirements: [],
      content: "Let's get on with this"
    },
    {
      type: StoryItemType.NARRATIVE,
      requirements: [],
      content: "Let's get on with this, shall we?"
    }
  ];

  get(item: number): StoryItem {
    return this.items[item];
  }
}
