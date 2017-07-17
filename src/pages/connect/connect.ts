import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { BluetoothService } from "../../services/bluetooth.service";
import {BluetoothDevice} from "../../types/bluetooth-device.type";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit {

  private pairedDevices: BluetoothDevice[];

  nextPage:any = TabsControllerPage;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private bluetoothService: BluetoothService, private alertCtrl: AlertController) {
  }

  connectDevice(device: BluetoothDevice){
    this.bluetoothService.connectDevice(device).subscribe(() => {
      this.deviceConnectedAlert(device.name);
    });
    this.navCtrl.push(this.nextPage);
  }

  deviceConnectedAlert(name) {
    let alert = this.alertCtrl.create({
      title: 'Device Connected',
      subTitle: name + ' connected via bluetooth.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ngOnInit(): void {
    this.bluetoothService.getPairedDevices()
      .then((devices) => {
        console.log(devices);
        this.pairedDevices = devices;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
