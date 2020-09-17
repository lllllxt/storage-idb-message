declare class IDB_ORDER {
    db: any;
    static db: any;
    constructor(isForce?: boolean);
    /** 新增/修改数据  */
    save(指令: String, 数据: any): Promise<unknown>;
    /** 移除指令数据 */
    remove(orderName: String): Promise<unknown>;
    /** 获取指令数据 */
    get(orderName: String): Promise<unknown>;
    static clearCache(successFn?: Function, errFn?: Function): void;
}
export default IDB_ORDER;
