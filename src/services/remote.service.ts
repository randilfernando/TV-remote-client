import { Injectable } from "@angular/core";
import { NativeStorage } from '@ionic-native/native-storage';
import { Remote } from "../types/remote.type";
import { Signal } from "../types/signal.type";

@Injectable()
export class RemoteService {
  private remotes: Remote[] = [];
  private selectedRemote: Remote;

  constructor(private nativeStorage: NativeStorage) { }

  public getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.nativeStorage.getItem('remotes')
        .then((remotes) => {
          if(this.remotes.length == 0){
            remotes.forEach((remote) => {
              this.remotes.push(remote);
            });
          }
          resolve(this.remotes);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  public addRemote(remote: Remote): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.remotes.push(remote);
      this.nativeStorage.setItem('remotes', this.remotes)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public addSignal(signal: Signal): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      let notAdded = true;

      for(let i = 0; i < this.selectedRemote.signals.length; i++){
        if (this.selectedRemote.signals[i].name == signal.name){
          this.selectedRemote.signals[i] = signal;
          notAdded = false;
        }
      }

      if (notAdded){
        this.selectedRemote.signals.push(signal);
      }

      this.nativeStorage.setItem('remotes', this.remotes)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    })
  }

  public clearRemote(){
    return new Promise<any>((resolve, reject) => {
      this.selectedRemote.signals = [];
      resolve();
    });
  }

  public getCurrent(): Remote {
    return this.selectedRemote;
  }

  public setCurrent(remote: Remote): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.selectedRemote = remote;
      resolve();
    });
  }

}
