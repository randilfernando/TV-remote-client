import { Injectable } from "@angular/core";
import { RemoteService } from "./remote.service";
import { Remote } from "../types/remote.type";
import { Signal } from "../types/signal.type";

@Injectable()
export class RemoteInMemoryService implements RemoteService {

    private remoteDB: Remote[] = [];
    private selectedRemote: Remote;

    getAll(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve(this.remoteDB);
        });
    }

    addRemote(remote: Remote): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.remoteDB.push(remote);
            resolve();
        });
    }

    addSignal(signal: Signal): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.selectedRemote.signals.push(signal);
            resolve();
        });
    }

    getCurrent(): Remote {
        return this.selectedRemote;
    }

    setCurrent(remote: Remote): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.selectedRemote = remote;
            resolve();
        });
    }

}
