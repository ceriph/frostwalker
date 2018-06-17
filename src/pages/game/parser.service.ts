import {Character} from "./character";
import {Injectable} from "@angular/core";

export const NAME_PARAM = "$name";

@Injectable()
export class ParserService {
  parse(text: string, character: Character): string {
    return text.replace(NAME_PARAM, character.name);
  }
}
