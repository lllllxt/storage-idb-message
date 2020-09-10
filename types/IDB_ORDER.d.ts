declare class IDB_ORDER {
    db: any;
    constructor();
    /** 新增/修改数据  */
    save(指令: String, 数据: any): Promise<unknown>;
    /** 移除指令数据 */
    remove(orderName: String): Promise<unknown>;
    /** 获取指令数据 */
    get(orderName: String): Promise<unknown>;
}
export default IDB_ORDER;
