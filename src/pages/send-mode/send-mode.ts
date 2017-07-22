import {ChangeDetectorRef, Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Remote } from "../../types/remote.type";
import { RemoteService } from "../../services/remote.service";
import { BluetoothService } from "../../services/bluetooth.service";
import { RemoteMessageService } from "../../services/remote-message.service";

@Component({
  selector: 'page-send-mode',
  templateUrl: 'send-mode.html'
})
export class SendModePage {

  private remotes: Remote[];

  private selectedRemote: Remote;

  private newRemote: string = '';

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private remoteService: RemoteService, private remoteMessageService: RemoteMessageService,
    private bluetoothService: BluetoothService, private changeDetectorRef: ChangeDetectorRef) {
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
          this.remoteMessageService.displayAlert(`Remote: ${remote.name} added.`);
          this.newRemote = '';
        })
        .catch((error) => {
          console.log(error)
        });
      this.changeDetectorRef.detectChanges();
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
        console.log(error);
      });
  }

  sendSignal(signal: string) {
    this.bluetoothService.sendData(signal)
      .then(() => {
        console.log('sent');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clearRemote(){
    this.remoteService.clearRemote()
      .then(() => {
        console.log('remote cleared');
      });
  }

  ionViewDidEnter() {
    this.bluetoothService.toggleSendMode()
      .then(() => {
        console.log('send mode');
      })
      .catch((error) => {
        console.log(error);
      });
    this.getAllRemotes();
    this.changeDetectorRef.detectChanges();
  }

}
