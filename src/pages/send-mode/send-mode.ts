import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {BluetoothService} from "../../services/bluetooth.service";
import {Remote} from "../../types/remote.type";
import {RemoteService} from "../../services/remote.service";

@Component({
  selector: 'page-send-mode',
  templateUrl: 'send-mode.html'
})
export class SendModePage implements OnInit{

  private remoteList: string[];

  private selectedRemote: Remote;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private bluetoothService: BluetoothService, private remoteService: RemoteService) {
  }

  addRemote(name: string){
    this.remoteService.addRemote({name: name, signals: []})
      .then((remote) => {
        this.selectedRemote = remote;
      });
  }

  getRemote(name: string){
    this.remoteService.getRemote(name)
      .then((remote) => {
        this.selectedRemote = remote;
      })
  }

  sendSignal(signal: string){
    this.bluetoothService.sendData(signal);
  }

  ngOnInit(){
    this.bluetoothService.toggleSendMode();
  }

}
