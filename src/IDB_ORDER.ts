class IDB_ORDER {
  db: any
  constructor() {
    const request = window.indexedDB.open('STORAGE_ORDER_DATA', 1)
    request.onerror = (event: any) => {
      console.log('数据库打开报错', event)
    }

    request.onsuccess = (event: any) => {
      this.db = event.target.result
      console.log('数据库打开成功', this.db, event)
    }

    /** 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件 */
    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result
      console.log('数据库创建成功', this.db, event)

      if (!this.db.objectStoreNames.contains('ORDER_DATA')) {
        const objectStore = this.db.createObjectStore('ORDER_DATA', {
          keyPath: 'order_name',
        })
        // const objectStore = this.db.createObjectStore("ORDER_DATA", {
        //   autoIncrement: true,
        // });
        objectStore.createIndex('指令名称', 'order_name', { unique: false })
        objectStore.createIndex('指令数据', 'order_value', { unique: false })
      }
    }
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
        .index('指令名称')
        .get(orderName)

      request.onerror = (event: any) => {
        console.error('获取数据失败', event)
        reject(event)
      }

      request.onsuccess = (event: any) => {
        resolve(request.result)
      }
    })
  }
}

export default IDB_ORDER
