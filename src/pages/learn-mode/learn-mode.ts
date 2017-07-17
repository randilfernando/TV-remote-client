import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Remote } from "../../types/remote.type";
import {RemoteService} from "../../services/remote.service";
import {BluetoothService} from "../../services/bluetooth.service";
import {LearnAgent} from "../../services/learn.agent";
import {Signal} from "../../types/signal.type";

@Component({
  selector: 'page-learn-mode',
  templateUrl: 'learn-mode.html'
})
export class LearnModePage implements OnInit {

  private selectedRemote: Remote;
  private isLearning: boolean;
  private learnedSignal: Signal = {name: '', code: ''};

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private remoteService: RemoteService, private bluetoothService: BluetoothService,
    private learnAgent: LearnAgent) {
  }

  ngOnInit(): void {
    this.selectedRemote = this.remoteService.getCurrent();
    this.isLearning = true;
    this.bluetoothService.toggleLearnMode()
      .then(() => {
        this.learnSignal();
      });
  }

  learnSignal(){
    this.isLearning = true;
    if (this.selectedRemote){
      this.learnAgent.detectCode()
        .then((signal) => {
          this.learnedSignal.code = signal.code;
          this.isLearning = false;
        });
    }
  }

  addSignal(){
    if(this.learnedSignal.name != '' && this.learnedSignal.code != ''){
      this.remoteService.addSignal(this.learnedSignal);
    }
  }

}
