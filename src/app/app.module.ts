import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SendModePage } from '../pages/send-mode/send-mode';
import { LearnModePage } from '../pages/learn-mode/learn-mode';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { ConnectPage } from '../pages/connect/connect';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BluetoothService} from "../services/bluetooth.service";
import {RemoteService} from "../services/remote.service";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";

@NgModule({
  declarations: [
    MyApp,
    SendModePage,
    LearnModePage,
    TabsControllerPage,
    ConnectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SendModePage,
    LearnModePage,
    TabsControllerPage,
    ConnectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothSerial,
    BluetoothService,
    RemoteService
  ]
})
export class AppModule {}
