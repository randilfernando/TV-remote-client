import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothService } from "../../services/bluetooth.service";
import { BluetoothDevice } from "../../types/bluetooth-device.type";
import { TabsControllerPage } from "../tabs-controller/tabs-controller";
import { RemoteMessageService } from "../../services/remote-message.service";

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage {

  private pairedDevices: BluetoothDevice[];

  nextPage: any = TabsControllerPage;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private bluetoothService: BluetoothService, private remoteMessageService: RemoteMessageService) {
  }

  connectDevice(device: BluetoothDevice) {
    this.bluetoothService.connectDevice(device)
      .subscribe(() => {
        this.remoteMessageService.displayAlert(`${device.name} connected.`);
        this.navCtrl.push(this.nextPage);
      });
    //this.navCtrl.push(this.nextPage); //later comment
  }

  refresh() {
    this.bluetoothService.getPairedDevices()
      .then((devices) => {
        this.pairedDevices = devices;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ionViewDidEnter() {
    this.refresh();
  }

}
