import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { Observable } from "rxjs";
import { BluetoothDevice } from "../types/bluetooth-device.type";

@Injectable()
export class BluetoothService {

  private pairedDevices: BluetoothDevice[];

  constructor(public bluetoothSerial: BluetoothSerial) { }

  public getPairedDevices(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.bluetoothSerial.list()
        .then((devices) => {
          this.pairedDevices = devices;
          resolve(this.pairedDevices);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  public isConnected(): Promise<any> {
    return this.bluetoothSerial.isConnected();
  }

  public checkBluetooth(): Promise<any> {
    return this.bluetoothSerial.isEnabled();
  }

  public connectDevice(device: BluetoothDevice): Observable<any> {
    return this.bluetoothSerial.connectInsecure(device.address);
  }

  public toggleSendMode(): Promise<any> {
    return this.bluetoothSerial.write("SEND");
  }

  public toggleLearnMode(): Promise<any> {
    return this.bluetoothSerial.write("LEARN");
  }

  public sendData(data: string): Promise<any> {
    return this.bluetoothSerial.write(data);
  }

  public subscribeData(delimiter: string): Observable<any> {
    return this.bluetoothSerial.subscribe(delimiter);
  }
}
