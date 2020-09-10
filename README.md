# storage-idb-message

> 基于 LocalStorage + IndexedDB 封装的消息传递的模块，在同源(不跨域)的前提下，用于同一页面多个 iframe、跨 tab 页面、移动端不同 webview 页面之间的消息传递

### 做这玩意的初衷

本来我是只用 LocalStorage 做消息传递的， 但后来某次在 Chrome 上传递的数据>5M 导致数据丢失，于是乎就有了用 LocalStorage 做指令，IndexedDB 做数据存储这个想法了

参考：

LocalStorage 储存空间在 2.5MB 到 10MB 之间（各家浏览器不同），而 IndexedDB 比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

### 通过 npm 安装

```
npm i @lllllxt/storage-idb-message
```

```
import StorageIdbMessage from '@lllllxt/storage-idb-message'

const StorageIdbMessage = request('@lllllxt/storage-idb-message')

const _SIM = new StorageIdbMessage(opts: Opts)

// 监听指令
_SIM.response = (orderName, data) => {
    console.log(orderName, data)
})

// 发送指令
_SIM.send(YourOrder, AnyData)

```

### 通过`<script>`标签引用

[storage-idb-message.min.js](https://github.com/lllllxt/storage-idb-message/blob/master/storage-idb-message.min.js)

此方法是向 window 对象中注册一个 `StorageIdbMessage` 对象

#### 参数(Opts)

| 参数       | 描述                                    |
| ---------- | --------------------------------------- |
| storageKey | 指令的 LocalStorage key 名称            |
| clearIdb   | 是否在 response 后清除 IndexedDB 的数据 |

#### 方法

| 方法                               | 描述                     |
| ---------------------------------- | ------------------------ |
| send(order: String, data: any)     | 发送                     |
| response(order: String, data: any) | 响应其他页面传过来的指令 |

## License

This project is licensed under the MIT License
