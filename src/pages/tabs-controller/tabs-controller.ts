import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SendModePage } from '../send-mode/send-mode';
import { LearnModePage } from '../learn-mode/learn-mode';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SendModePage;
  tab2Root: any = LearnModePage;
  constructor(public navCtrl: NavController) {
  }
  
}
