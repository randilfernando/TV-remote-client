import { Injectable } from "@angular/core";
import { BluetoothService } from "./bluetooth.service";
import { Signal } from "../types/signal.type";

@Injectable()
export class LearnAgent {

  constructor(private bluetoothService: BluetoothService) {
  }

  public detectCode(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let received = {};

      let subscribe = this.bluetoothService.subscribeData("\n")
        .subscribe((signal) => {
          signal = signal.replace("\n", "");

          if (!received.hasOwnProperty(signal)) {
            received[signal] = 1;
          } else {
            received[signal] = received[signal] + 1;
          }

          if (received[signal] == 3) {
            subscribe.unsubscribe();
            let decodedSignal: Signal = { name: '', code: signal };
            resolve(decodedSignal);
          }
        })
    });
  }

}
