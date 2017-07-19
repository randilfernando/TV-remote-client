import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class RemoteMessageService {
  
  constructor(private alertCtrl: AlertController){}

  displayAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}