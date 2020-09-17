const databaseName = 'STORAGE_ORDER_DATA'
class IDB_ORDER {
  db: any
  static db: any
  constructor(isForce: boolean = false) {
    const init = () => {
      const request = window.indexedDB.open(databaseName, 1)

      request.onsuccess = (event: any) => {
        console.log('✅打开数据库')
        IDB_ORDER.db = this.db = event.target.result
      }

      request.onerror = (event: any) => {
        console.error('❌打开数据库', event)
      }

      /** 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件 */
      request.onupgradeneeded = (event: any) => {
        this.db = event.target.result
        console.log('✅数据库创建/更新', this.db, event)

        if (this.db.objectStoreNames.contains('ORDER_DATA')) {
          this.db.deleteObjectStore('ORDER_DATA')
        }

        const objectStore = this.db.createObjectStore('ORDER_DATA', {
          keyPath: 'order_name',
        })
        objectStore.createIndex('order_name', 'order_name', { unique: false })
        objectStore.createIndex('order_value', 'order_value', { unique: false })
      }
    }
    isForce ? IDB_ORDER.clearCache(() => init()) : init()
  }

  /** 新增/修改数据  */
  save(指令: String, 数据: any) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction(['ORDER_DATA'], 'readwrite').objectStore('ORDER_DATA').put({
        order_name: 指令,
        order_value: 数据,
      })

      request.onsuccess = (event: any) => {
        resolve(event)
      }

      request.onerror = (event: any) => {
        console.error('数据写入失败', event)
        reject(event)
      }
    })
  }

  /** 移除指令数据 */
  remove(orderName: String) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction(['ORDER_DATA'], 'readwrite').objectStore('ORDER_DATA').delete(orderName)

      request.onsuccess = (event: any) => {
        resolve(event)
      }
      request.onerror = (event: any) => {
        console.error('删除数据失败', event)
        reject(event)
      }
    })
  }

  /** 获取指令数据 */
  get(orderName: String) {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(['ORDER_DATA'], 'readonly')
        .objectStore('ORDER_DATA')
        .index('order_name')
        .get(orderName)

      request.onerror = (event: any) => {
        console.error('❌获取数据失败', event)
        reject(event)
      }

      request.onsuccess = (event: any) => {
        resolve(request.result)
      }
    })
  }

  /* 删除缓存*/
  static clearCache(successFn?: Function, errFn?: Function) {
    this?.db?.close()
    const request = window.indexedDB.deleteDatabase(databaseName)
    request.onerror = (event: any) => {
      errFn && errFn(event)
    }

    request.onsuccess = (event: any) => {
      successFn && successFn(event)
    }
  }
}

export default IDB_ORDER
