export class Character {
  name: string;
  book: number;
  index: number;
  choices: string[];

  constructor() {
    this.name = "";
    this.index = 0;
    this.choices = [];
  }
}
