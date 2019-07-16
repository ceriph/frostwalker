import {Component} from '@angular/core';

import {RecordsPage} from '../records/records';
import {TonicPage} from '../tonic/tonic';
import {HomePage} from '../home/home';
import {SettingsPage} from "../settings/settings";
import {GamePage} from "../game/game";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome = HomePage;
  tabGame = GamePage;
  tabRecords = RecordsPage;
  tabTonic = TonicPage;
  tabSettings = SettingsPage;

  constructor() {}
}
