import {Character} from "../pages/game/character";
import {Storage} from "@ionic/storage";

export class StorageService {
  SAVE_KEY = "character";

  constructor (private storage: Storage) {}

  save(character: Character) {
    this.storage.set(this.SAVE_KEY, JSON.stringify(character));
  }

  load(): Promise<Character> {
    return this.storage.get(this.SAVE_KEY).then((characterString) => {
      return JSON.parse(characterString);
    });
  }

  reset() {
    this.save(new Character);
  }
}
