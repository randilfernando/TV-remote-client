import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Remote } from "../../types/remote.type";
import { RemoteInMemoryService } from "../../services/remote-inmemory.service";

@Component({
  selector: 'page-learn-mode',
  templateUrl: 'learn-mode.html'
})
export class LearnModePage implements OnInit {

  private selectedRemote: Remote;
  private isLearning: boolean;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private remoteService: RemoteInMemoryService) {
  }

  ngOnInit(): void {
    this.isLearning = true;
    this.selectedRemote = this.remoteService.getCurrent()
  }

  learnSignal(){

  }

}
