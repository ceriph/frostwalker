import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome = HomePage;
  tabAbout = AboutPage;
  tabSettings = SettingsPage;
  tabContact = ContactPage;

  constructor() {}
}
