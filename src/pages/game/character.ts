export class Data {
  slots: number;
  lastLoaded: number;
  characters: Character[];
  themes: string[];
  theme: string;

  constructor() {
    this.slots = 1;
    this.lastLoaded = 0;
    this.theme = Themes.darkWheat;
    this.themes = [Themes.darkWheat];
    this.characters = [new Character()];
  }
}

export class Themes {
  static darkWheat = 'darkWheat';
  static lightWheat = 'lightWheat';
  static lightFrost = 'lightFrost';
}

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
