export class Data {
  slots: number;
  lastLoaded: number;
  characters: Character[];
  themeMode: ThemeMode;
  theme: string;

  constructor() {
    this.slots = 1;
    this.lastLoaded = 0;
    this.theme = Themes.darkNeutral;
    this.themeMode = ThemeMode.DYNAMIC;
    this.characters = [new Character()];
  }
}

export enum ThemeMode {
  DYNAMIC = 'dynamic',
  DYNAMIC_DARK = 'dynamic-dark',
  DYNAMIC_LIGHT = 'dynamic-light',
  STATIC = 'static'
}

export class Themes {
  static darkNeutral = 'dark-neutral';
  static darkCold = 'dark-cold';
  static darkWarm = 'dark-warm';
  static darkRomantic = 'dark-romantic';
  static darkAngry = 'dark-angry';
  static lightNeutral = 'light-neutral';
  static lightCold = 'light-cold';
  static lightWarm = 'light-warm';
  static lightRomantic = 'light-romantic';
  static lightAngry = 'light-angry';
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
