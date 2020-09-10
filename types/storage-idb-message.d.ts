import IDBOrder from './IDB_ORDER';
declare class Opts {
    storageKey: string;
    clearIdb: boolean;
    constructor({ storageKey, clearIdb }?: {
        storageKey?: string;
        clearIdb?: boolean;
    });
}
declare class StorageIdbMessage {
    idb: IDBOrder;
    STORAGE_KEY: string;
    constructor(opts: Opts);
    send(order: String, data: any): void;
    response(order: String, data: any): void;
}
export default StorageIdbMessage;
