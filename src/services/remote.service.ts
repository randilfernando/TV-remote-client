import { Remote } from "../types/remote.type";
import { Signal } from "../types/signal.type";

export interface RemoteService {
    getAll(): Promise<any>;
    addRemote(remote: Remote): Promise<any>;
    addSignal(signal: Signal): Promise<any>;
    setCurrent(remote: Remote): Promise<any>;
    getCurrent(): Remote;
}