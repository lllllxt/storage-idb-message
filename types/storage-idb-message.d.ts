import IDBOrder from './IDB_ORDER';
declare class Opts {
    storageKey: string;
    clearIdb: boolean;
    force: boolean;
    constructor({ storageKey, clearIdb, force }?: {
        storageKey?: string;
        clearIdb?: boolean;
        force?: boolean;
    });
}
declare class StorageIdbMessage {
    idb: IDBOrder;
    STORAGE_KEY: string;
    constructor(opts: Opts);
    send(order: String, data: any): void;
    response(order: String, data: any): void;
    static clearCache(successFn?: Function, errFn?: Function): void;
}
export default StorageIdbMessage;
