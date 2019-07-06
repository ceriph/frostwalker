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
  TUTORIAL = 'TUTORIAL',
  NAME = 'NAME',
  CHAPTER = 'CHAPTER',
  NARRATIVE = 'NARRATIVE',
  DIALOGUE_NPC = 'DIALOGUE_NPC',
  DIALOGUE_PC = 'DIALOGUE_PC',
  CHOICE = 'CHOICE',
  END = 'END'
}

export class Choice {
  intuition: string;
  options: Option[];

  constructor(intuition: string, options: Option[]) {
    this.intuition = intuition;
    this.options = options;
  }

  static fromString(value: string): Choice {
    const firstSplit = value.split('#');
    const secondSplit = firstSplit[1].split('|');
    const options = secondSplit.map((option) => {
      const optionArray = option.split('=');
      return new Option(optionArray[0], optionArray[1]);
    });
    console.log(options);
    return new Choice(firstSplit[0], options);
  }

}

export class Option {
  name: string;
  label: string;

  constructor(name: string, label: string){
    this.name = name;
    this.label = label;
  }
}
