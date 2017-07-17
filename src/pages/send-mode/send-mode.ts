import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Remote } from "../../types/remote.type";
import { RemoteInMemoryService } from "../../services/remote-inmemory.service";

@Component({
  selector: 'page-send-mode',
  templateUrl: 'send-mode.html'
})
export class SendModePage implements OnInit {

  private remotes: Remote[];

  private selectedRemote: Remote;

  private addingRemote: string = '';

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private remoteService: RemoteInMemoryService, private alertCtrl: AlertController) {
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
    return (this.addingRemote != '');
  }

  addRemote() {
    if (this.canAddRemote()) {
      let remote: Remote = {
        name: this.addingRemote,
        signals: []
      };
      this.remoteService.addRemote(remote)
        .then(() => {
          this.deviceAlert(`Device: ${remote.name} added.`);
          this.addingRemote = '';
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  chooseRemote(remote: Remote) {
    this.selectedRemote = remote;
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
    //this.bluetoothService.sendData(signal);
  }

  ngOnInit() {
    //this.bluetoothService.toggleSendMode();
    this.getAllRemotes();
    // this.remoteNames = ['NEC', 'SONY', 'HC5', 'HC6'];
    // this.selectedRemote = {
    //   name: 'NEC',
    //   signals: [
    //     {
    //       name: 'Vol_Up',
    //       code: '001'
    //     },
    //     {
    //       name: 'Vol_Down',
    //       code: '010'
    //     },
    //     {
    //       name: 'Power',
    //       code: '100'
    //     }
    //   ]
    // }
  }

}
