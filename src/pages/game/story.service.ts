import {Story, StoryItem, StoryItemType} from "./story";
import {NAME_PARAM} from "./parser.service";
import {Injectable} from "@angular/core";

@Injectable()
export class StoryService {

  story: Story = {
    title: "Book 1 - The Dark Ascent",
    description: "Darkness ascends from the depths, can you stop it?",
    choices: ["FIGHTER", "THINKER", "NICE_TO_JIMMY"],
    items: [
      {
        type: StoryItemType.CHAPTER,
        requirements: [],
        content: "1"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: [],
        content: "A sharp pain shoots through your head as you wake, the hard stone floor cold against your cheek"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: [],
        content: "Trying to stand up, your body resists, sending pain shooting through your head, but eventually you make it shakily to your feet"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: [],
        content: "A young man chained to the opposite wall nods at you with a weak smile, his left eye bruised and his chin covered in dried blood"
      },
      {
        type: StoryItemType.DIALOGUE,
        requirements: [],
        content: "You look almost as bad as I feel"
      },
      {
        type: StoryItemType.DIALOGUE,
        requirements: [],
        content: "Quite the brawl, shame it had to end so...abruptly"
      },
      {
        type: StoryItemType.DIALOGUE,
        requirements: [],
        content: "Oh, my name is Jimmy, what's yours?"
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
        content: "Well, under the circumstances, anyway"
      },
      {
        type: StoryItemType.DIALOGUE,
        requirements: [],
        content: "How did you get involved in the fight?"
      },
      {
        type: StoryItemType.CHOICE,
        requirements: [],
        content: "FIGHTER=I love fighting,THINKER=I hate fighting"
      },
      {
        type: StoryItemType.DIALOGUE,
        requirements: ["FIGHTER"],
        content: "Oh wow, I wish I was that confident!"
      },
      {
        type: StoryItemType.DIALOGUE,
        requirements: ["THINKER"],
        content: "Ah yes, me too, not much of a fighter!"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: [],
        content: "Let's getItem on with this"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: [],
        content: "Let's getItem on with this, shall we?"
      }
    ]
  };

  get(): Story {
    return this.story;
  }

  getItem(item: number): StoryItem {
    return this.story.items[item];
  }
}
