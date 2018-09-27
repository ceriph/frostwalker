import {Story, StoryItem, StoryItemType} from "./story";
import {NAME_PARAM} from "./parser.service";
import {Injectable} from "@angular/core";

@Injectable()
export class StoryService {

  story: Story = {
    title: "Book 1 - The Dark Ascent",
    description: "Darkness ascends from the depths, can you stop it?",
    choices: ["FIGHTER", "THINKER"],
    items: [
      {
        type: StoryItemType.TUTORIAL,
        requirements: [],
        content: "<b>TAP ANYWHERE</b> TO PROGRESS"
      },
      {
        type: StoryItemType.TUTORIAL,
        requirements: [],
        content: "<b>SWIPE DOWN</b> TO HIDE MENU"
      },
      {
        type: StoryItemType.TUTORIAL,
        requirements: [],
        content: "<b>SWIPE UP</b> TO SHOW MENU"
      },
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
        type: StoryItemType.DIALOGUE_NPC,
        requirements: [],
        content: "You look almost as bad as I feel"
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: [],
        content: "Quite the brawl, shame it had to end so...abruptly"
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: [],
        content: "Oh, my name is Jimmy, what's yours?"
      },
      {
        type: StoryItemType.NAME,
        requirements: [],
        content: ""
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: [],
        content: "Nice to meet you, " + NAME_PARAM + "!"
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: [],
        content: "Well, under the circumstances, anyway"
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: [],
        content: "How did you get involved in the fight?"
      },
      {
        type: StoryItemType.CHOICE,
        requirements: [],
        content: "Jimmy seems concerned you were involved in the fight, it might ease his mind if you tell him you weren't. However, if you wanted to scare the kid...#FIGHTER=I jumped in as soon as I could|THINKER=I tried to leave but got caught up"
      },
      {
        type: StoryItemType.DIALOGUE_PC,
        requirements: ["FIGHTER"],
        content: "I love a good fight, jumped in as soon as I could"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: ["FIGHTER"],
        content: "You say this with a smile, but Jimmy frowns, backing away slightly"
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: ["FIGHTER"],
        content: "Ah, I see..."
      },
      {
        type: StoryItemType.DIALOGUE_PC,
        requirements: ["THINKER"],
        content: "Bit of an accident, I tried to leave but got caught up in it"
      },
      {
        type: StoryItemType.NARRATIVE,
        requirements: ["THINKER"],
        content: "As you say this, Jimmy visibly relaxes"
      },
      {
        type: StoryItemType.DIALOGUE_NPC,
        requirements: ["THINKER"],
        content: "Aha, yes, me too!"
      },
      {
        type: StoryItemType.END,
        requirements: [],
        content: "End of Demo"
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
