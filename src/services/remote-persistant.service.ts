import { Injectable } from "@angular/core";
import { NativeStorage } from '@ionic-native/native-storage';
import { Remote } from "../types/remote.type";
import { Signal } from "../types/signal.type";
import { RemoteService } from "./remote.service";

@Injectable()
export class RemotePersistantService implements RemoteService {
  private remotes: Remote[] = [];
  private selectedRemote: Remote;

  constructor(private nativeStorage: NativeStorage) { }

  public getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.nativeStorage.getItem('remotes')
        .then((remotes) => {
          this.remotes = remotes;
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
      this.selectedRemote.signals.push(signal);
      this.nativeStorage.setItem('remotes', this.remotes)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    })
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
