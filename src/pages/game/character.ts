export class Character {
  name: string;
  index: number;
  choices: string[];
  intuition: number;

  constructor() {
    this.name = "";
    this.index = 0;
    this.choices = [];
    this.intuition = 10;
  }
}
