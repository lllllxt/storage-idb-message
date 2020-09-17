import IDBOrder from './IDB_ORDER'
class Opts {
  storageKey: string
  clearIdb: boolean
  force: boolean
  constructor({ storageKey = 'StorageIdbMessageOrder', clearIdb = true, force = false } = {}) {
    this.storageKey = storageKey
    this.clearIdb = clearIdb
    this.force = force
  }
}
class StorageIdbMessage {
  idb: IDBOrder
  STORAGE_KEY: string
  constructor(opts: Opts) {
    const { storageKey, clearIdb, force } = new Opts(opts)
    this.idb = new IDBOrder(force)
    this.STORAGE_KEY = storageKey
    window.addEventListener('storage', (data) => {
      if (data.key === this.STORAGE_KEY) {
        const orderName = JSON.parse(data.newValue).order
        this.idb.get(orderName).then(({ order_name: name, order_value: value }) => {
          this.response(name, value)
          clearIdb && this.idb.remove(name)
        })
      }
    })
  }

  send(order: String, data: any) {
    this.idb.save(order, data).then(() => {
      const random = Math.random()
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ order, random }))
    })
  }

  response(order: String, data: any) {
    console.log(order, data)
  }

  static clearCache(successFn?: Function, errFn?: Function) {
    IDBOrder.clearCache(successFn, errFn)
  }
}
export default StorageIdbMessage
