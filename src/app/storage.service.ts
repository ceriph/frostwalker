import {Character} from "../pages/game/character";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {
  SAVE_KEY = "character";

  character: Character;

  constructor(private storage: Storage) {
  }

  init(): Promise<string> {
    console.log("Loading character...");
    return this.storage.get(this.SAVE_KEY)
  }

  set(character: Character) {
    console.log("Setting character state...");
    this.character = character;
  }

  save(character: Character) {
    this.character = character;
    this.storage.set(this.SAVE_KEY, JSON.stringify(character));
  }

  get(): Character {
    return this.character;
  }

  reset() {
    this.character = new Character();
    this.save(this.character);
  }
}
