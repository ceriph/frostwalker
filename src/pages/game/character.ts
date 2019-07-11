export class Character {
  name: string;
  index: number;
  choices: string[];
  tonic: number;

  constructor() {
    this.name = "";
    this.index = 0;
    this.choices = [];
    this.tonic = 0;
  }
}
