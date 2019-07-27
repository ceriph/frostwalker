export const MOOD_PREFIX = 'mood';
export const MOOD_DARK = 'dark';
export const MOOD_LIGHT = 'light';

export class Data {
  slots: number;
  lastLoaded: number;
  characters: Character[];
  themes: string[];
  theme: string;

  constructor() {
    this.slots = 1;
    this.lastLoaded = 0;
    this.theme = MOOD_PREFIX + "-" + Themes.darkNeutral;
    this.themes = [MOOD_PREFIX + "-" + Themes.darkNeutral];
    this.characters = [new Character()];
  }
}

export class Themes {
  static darkWarm = 'dark-warm';
  static darkCold = 'dark-cold';
  static darkNeutral = 'dark-neutral';
  static darkRomantic = 'dark-romantic';
  static lightRomantic = 'light-romantic';
  static lightNeutral = 'light-neutral';
  static lightCold = 'light-cold';
  static lightWarm = 'light-warm';
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
