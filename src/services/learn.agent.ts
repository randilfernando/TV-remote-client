import { Injectable } from "@angular/core";
import { BluetoothService } from "./bluetooth.service";
import { Signal } from "../types/signal.type";

@Injectable()
export class LearnAgent {

  constructor(private bluetoothService: BluetoothService) {
  }

  public detectCode(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      let received = {};
      let count = 10;
      let maximumReceived: string;
      let max: number = 0;

      let subscribe = this.bluetoothService.subscribeData('\n')
        .subscribe((signal) => {
          count ++;
          signal = signal.replace("\n", "");

          if (!received.hasOwnProperty(signal)){
            received[signal] = 1;
          }else{
            received[signal] = received[signal] + 1;
          }

          if (max < received[signal]){
            max = received[signal];
            maximumReceived = signal;
          }

          if (count >= 10){
            subscribe.unsubscribe();
            let decodedSignal: Signal = {name: '', code: signal};
            resolve(decodedSignal);
          }
        })
    });
  }

}
