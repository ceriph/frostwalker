import {Component} from '@angular/core';

import {StatsPage} from '../stats/stats';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome = HomePage;
  tabStats = StatsPage;
  tabSettings = SettingsPage;
  tabContact = ContactPage;

  constructor() {}
}
