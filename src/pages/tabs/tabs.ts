import {Component} from '@angular/core';

import {StatsPage} from '../stats/stats';
import {StatusPage} from '../status/status';
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
  tabStats = StatsPage;
  tabSettings = SettingsPage;
  tabStatus = StatusPage;

  constructor() {}
}
