export class Character {
  name: string;
  index: number;
  tags: CharacterTag[];

  constructor() {
    this.name = "";
    this.index = 0;
    this.tags = [];
  }
}

export enum CharacterTag {
  FIGHTER, THINKER, NICE_TO_JIMMY
}
