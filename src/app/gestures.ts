import {HammerGestureConfig} from "@angular/platform-browser";

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': { direction: window['Hammer'].DIRECTION_ALL } // override default settings
  }
}
