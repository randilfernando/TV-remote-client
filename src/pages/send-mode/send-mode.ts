import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Remote } from "../../types/remote.type";
import { RemoteService } from "../../services/remote.service";
import {BluetoothService} from "../../services/bluetooth.service";

@Component({
  selector: 'page-send-mode',
  templateUrl: 'send-mode.html'
})
export class SendModePage implements OnInit {

  private remotes: Remote[];

  private selectedRemote: Remote;

  private newRemote: string = '';

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private remoteService: RemoteService, private alertCtrl: AlertController,
              private bluetoothService: BluetoothService) {
  }

  deviceAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  canAddRemote(): boolean {
    return (this.newRemote != '');
  }

  addRemote() {
    if (this.canAddRemote()) {
      let remote: Remote = {
        name: this.newRemote,
        signals: []
      };
      this.remoteService.addRemote(remote)
        .then(() => {
          this.deviceAlert(`Device: ${remote.name} added.`);
          this.newRemote = '';
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  chooseRemote() {
    this.remoteService.setCurrent(this.selectedRemote);
    this.bluetoothService.toggleSendMode();
  }

  getAllRemotes() {
    this.remoteService.getAll()
      .then((remotes) => {
        this.remotes = remotes;
      })
      .catch((error) => {
        console.log(error)
      });
  }

  sendSignal(signal: string) {
    this.bluetoothService.sendData(signal);
  }

  ngOnInit() {
    this.bluetoothService.toggleSendMode();
    this.getAllRemotes();
  }

}
