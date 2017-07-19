import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Remote } from "../../types/remote.type";
import { RemoteService } from "../../services/remote.service";
import { BluetoothService } from "../../services/bluetooth.service";
import { LearnAgent } from "../../services/learn.agent";
import { Signal } from "../../types/signal.type";
import { RemoteMessageService } from "../../services/remote-message.service";

@Component({
  selector: 'page-learn-mode',
  templateUrl: 'learn-mode.html'
})
export class LearnModePage {

  private selectedRemote: Remote;
  private isLearning: boolean;
  private learnedSignal: Signal = { name: '', code: '' };

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private remoteService: RemoteService, private bluetoothService: BluetoothService,
    private learnAgent: LearnAgent, private remoteMessageService: RemoteMessageService) {
  }

  learnSignal() {
    this.bluetoothService.toggleLearnMode()
      .then(() => {
        this.isLearning = true;
        this.clearLearnedSignal();
        if (this.selectedRemote) {
          this.learnAgent.detectCode()
            .then((signal) => {
              this.learnedSignal.code = signal.code;
              this.isLearning = false;
            });
        } else {
          this.remoteMessageService.displayAlert('Please select remote.')
        }
      });
  }

  clearLearnedSignal() {
    this.learnedSignal.code = '';
    this.learnedSignal.name = '';
  }

  addSignal() {
    if (this.learnedSignal.name != '' && this.learnedSignal.code != '') {
      let newSignal: Signal = { name: this.learnedSignal.name, code: this.learnedSignal.code };
      this.remoteService.addSignal(newSignal);
      this.remoteMessageService.displayAlert(`Signal ${this.learnedSignal.name} added.`);
      this.clearLearnedSignal();
    } else {
      this.remoteMessageService.displayAlert('Please enter signal name.');
    }
  }

  ionViewDidEnter() {
    this.selectedRemote = this.remoteService.getCurrent();
    this.isLearning = true;
    this.learnSignal();
  }

}
