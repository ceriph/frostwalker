import {Character, Data} from "../pages/game/character";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {
  SAVE_KEY = "fw-save-data";

  data: Data;

  constructor(private storage: Storage) {
  }

  init(): Promise<string> {
    console.log("Loading character...");
    return this.storage.get(this.SAVE_KEY)
  }

  getData(): Data {
    return this.data;
  }

  get(slot?: number): Character {
    if (!slot)
      slot = this.data.lastLoaded;

    return this.data.characters[slot];
  }

  set(data: Data) {
    console.log("Setting data state...");
    this.data = data;
  }

  save(character: Character, slot?: number) {
    if(!slot)
      slot = this.data.lastLoaded;

    this.data.characters[slot] = character;
    this.saveData(this.data);
  }

  saveData(data: Data) {
    this.data = data;
    this.storage.set(this.SAVE_KEY, JSON.stringify(data));
  }

  reset(slot: number) {
    this.save(new Character(), slot);
    if(slot > 0) {
      this.data.lastLoaded = slot-1;
      this.data.characters = this.data.characters.filter((character, index) => index !== slot);
      this.saveData(this.data);
    }
  }
}
