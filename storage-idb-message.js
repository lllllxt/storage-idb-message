(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.StorageIdbMessage = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var IDB_ORDER = /*#__PURE__*/function () {
    function IDB_ORDER() {
      var _this = this;

      _classCallCheck(this, IDB_ORDER);

      var request = window.indexedDB.open('STORAGE_ORDER_DATA', 1);

      request.onerror = function (event) {
        console.log('数据库打开报错', event);
      };

      request.onsuccess = function (event) {
        _this.db = event.target.result;
        console.log('数据库打开成功', _this.db, event);
      };
      /** 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件 */


      request.onupgradeneeded = function (event) {
        _this.db = event.target.result;
        console.log('数据库创建成功', _this.db, event);

        if (!_this.db.objectStoreNames.contains('ORDER_DATA')) {
          var objectStore = _this.db.createObjectStore('ORDER_DATA', {
            keyPath: 'order_name'
          }); // const objectStore = this.db.createObjectStore("ORDER_DATA", {
          //   autoIncrement: true,
          // });


          objectStore.createIndex('指令名称', 'order_name', {
            unique: false
          });
          objectStore.createIndex('指令数据', 'order_value', {
            unique: false
          });
        }
      };
    }
    /** 新增/修改数据  */


    _createClass(IDB_ORDER, [{
      key: "save",
      value: function save(指令, 数据) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          var request = _this2.db.transaction(['ORDER_DATA'], 'readwrite').objectStore('ORDER_DATA').put({
            order_name: 指令,
            order_value: 数据
          });

          request.onsuccess = function (event) {
            resolve(event);
          };

          request.onerror = function (event) {
            console.error('数据写入失败', event);
            reject(event);
          };
        });
      }
      /** 移除指令数据 */

    }, {
      key: "remove",
      value: function remove(orderName) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          var request = _this3.db.transaction(['ORDER_DATA'], 'readwrite').objectStore('ORDER_DATA').delete(orderName);

          request.onsuccess = function (event) {
            resolve(event);
          };

          request.onerror = function (event) {
            console.error('删除数据失败', event);
            reject(event);
          };
        });
      }
      /** 获取指令数据 */

    }, {
      key: "get",
      value: function get(orderName) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          var request = _this4.db.transaction(['ORDER_DATA'], 'readonly').objectStore('ORDER_DATA').index('指令名称').get(orderName);

          request.onerror = function (event) {
            console.error('获取数据失败', event);
            reject(event);
          };

          request.onsuccess = function (event) {
            resolve(request.result);
          };
        });
      }
    }]);

    return IDB_ORDER;
  }();

  var Opts = function Opts() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? 'StorageIdbMessageOrder' : _ref$storageKey,
        _ref$clearIdb = _ref.clearIdb,
        clearIdb = _ref$clearIdb === void 0 ? true : _ref$clearIdb;

    _classCallCheck(this, Opts);

    this.storageKey = storageKey;
    this.clearIdb = clearIdb;
  };

  var StorageIdbMessage = /*#__PURE__*/function () {
    function StorageIdbMessage(opts) {
      var _this = this;

      _classCallCheck(this, StorageIdbMessage);

      this.idb = new IDB_ORDER();

      var _Opts = new Opts(opts),
          storageKey = _Opts.storageKey,
          clearIdb = _Opts.clearIdb;

      console.log(storageKey, clearIdb);
      this.STORAGE_KEY = storageKey;
      window.addEventListener('storage', function (data) {
        if (data.key === _this.STORAGE_KEY) {
          var orderName = JSON.parse(data.newValue).order;

          _this.idb.get(orderName).then(function (_ref2) {
            var name = _ref2.order_name,
                value = _ref2.order_value;

            _this.response(name, value);

            clearIdb && _this.idb.remove(name);
          });
        }
      });
    }

    _createClass(StorageIdbMessage, [{
      key: "send",
      value: function send(order, data) {
        var _this2 = this;

        this.idb.save(order, data).then(function () {
          var random = Math.random();
          localStorage.setItem(_this2.STORAGE_KEY, JSON.stringify({
            order: order,
            random: random
          }));
        });
      }
    }, {
      key: "response",
      value: function response(order, data) {
        console.log(order, data);
      }
    }]);

    return StorageIdbMessage;
  }();

  return StorageIdbMessage;

})));
