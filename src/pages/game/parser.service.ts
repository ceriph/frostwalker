import {Character} from "./character";

export const NAME_PARAM = "$name";

export class ParserService {
  parse(text: string, character: Character): string {
    return text.replace(NAME_PARAM, character.name);
  }
}
