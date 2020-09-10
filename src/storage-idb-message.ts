import IDBOrder from './IDB_ORDER'

class Opts {
  storageKey: string
  clearIdb: boolean
  constructor({ storageKey = 'StorageIdbMessageOrder', clearIdb = true } = {}) {
    this.storageKey = storageKey
    this.clearIdb = clearIdb
  }
}
class StorageIdbMessage {
  idb = new IDBOrder()
  STORAGE_KEY: string
  constructor(opts: Opts) {
    const { storageKey, clearIdb } = new Opts(opts)
    console.log(storageKey, clearIdb)

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
}
export default StorageIdbMessage
