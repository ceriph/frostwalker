import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {SettingsPage} from "../settings/settings";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({height: '0'}),
        animate('1s ease-out', style({height: 'auto'})),
      ]),
    ])
  ]
})
export class TabsPage {

  tabHome = HomePage;
  tabAbout = AboutPage;
  tabSettings = SettingsPage;
  tabContact = ContactPage;

  seeTabs: boolean = true;

  constructor() {}

  showTabs() {
    this.seeTabs = true;
  }

  hideTabs() {
    this.seeTabs = false;
  }
}
