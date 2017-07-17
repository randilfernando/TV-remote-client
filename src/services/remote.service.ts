import { Injectable } from "@angular/core";
import { NativeStorage } from '@ionic-native/native-storage';
import { Remote } from "../types/remote.type";
import { Signal } from "../types/signal.type";

@Injectable()
export class RemoteService{

  private remotes: String[];
  private selectedRemote: Remote;

  constructor(private nativeStorage: NativeStorage){}

  public loadRemotes() : Promise<String[]> {
    return new Promise<String[]>((resolve, reject) => {
      this.nativeStorage.getItem("remotes")
        .then((remotes) => {
          this.remotes = remotes;
          resolve(this.remotes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getRemote(remoteName: string): Promise<Remote>{
    return new Promise<Remote>((resolve, reject) => {
      this.nativeStorage.getItem(remoteName)
        .then((remote) => {
          this.selectedRemote = remote;
          resolve(this.selectedRemote);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public addRemote(remote: Remote): Promise<Remote>{
    return new Promise<Remote>((resolve, reject) => {
      this.nativeStorage.setItem(remote.name, remote)
        .then((data) => {
          this.selectedRemote = remote;
          resolve(this.selectedRemote);
        })
        .catch((error) => {
          console.log(error);
          reject(remote);
        });
    })
  }

  public removeRemote(remote: Remote): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.nativeStorage.remove(remote.name)
        .then((data) => {
          this.selectedRemote = null;
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    })
  }

  public addSignal(signal: Signal): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.selectedRemote.signals.push(signal);
      this.nativeStorage.setItem(this.selectedRemote.name, this.selectedRemote)
        .then((data) => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    })
  }

  //Getters
  public getSelectedRemote(): Remote{
    return this.selectedRemote;
  }

  public getRemoteNames(): String[]{
    return this.remotes;
  }

}
