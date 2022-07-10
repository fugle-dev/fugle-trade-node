# Fugle Trade

[![NPM version][npm-image]][npm-url]
[![Build Status][action-image]][action-url]
[![Coverage Status][codecov-image]][codecov-url]

> 富果交易 API Node.js SDK

## 安裝

```sh
$ npm install --save @fugle/trade
```

## 匯入模組

```js
// 使用 Node.js `require()` 匯入
const { FugleTrade, Order } = require('@fugle/trade');

// 使用 ES6 imports 匯入
import { FugleTrade, Order } from '@fugle/trade';
```

## 快速開始

```js
import { FugleTrade, Order } from '@fugle/trade';

const fugle = new FugleTrade({ configPath: '/path/to/config.ini' });

fugle.login().then(() => {
  fugle.streamer.connect();

  fugle.streamer.on('connect', () => {
    console.log('streamer connected');

    const order = new Order({
      buySell: Order.Side.Buy,
      price: 25.00,
      stockNo: '2884',
      quantity: 1,
      apCode: Order.ApCode.Common,
      priceFlag: Order.PriceFlag.Limit,
      bsFlag: Order.BsFlag.ROD,
      trade: Order.Trade.Cash,
    });

    // 下單
    fugle.placeOrder(order);
  });

  fugle.streamer.on('disconnect', () => {
    console.log('streamer disconnected');
  });

  fugle.streamer.on('order', (data) => {
    console.log('order confirmation:');
    console.log(data);
  });

  fugle.streamer.on('trade', (data) => {
    console.log('execution report:');
    console.log(data);
  });
});
```

## 使用方式

請確認您已申請使用富果交易 API，並將配置文件和憑證下載到本機。

### 建立客戶端

首先，建立一個 `FugleTrade` 客戶端並包含 `configPath` 選項以指定配置文件路徑：

```js
const fugle = new FugleTrade({ configPath: '/path/to/config.ini' });
```

### 登入遠端伺服器

建立 `FugleTrade` 客戶端後，需要登入遠端伺服器以取得有效的 API Token：

```js
await fugle.login();
```

首次登入時，需要先設定您的帳號密碼以及憑證密碼：

```sh
? Enter esun account password ********
? Enter cert password ********
```

完成登入後，您可以開始下單交易並查看帳務資訊：

```js
// 取得進行中的委託單
const orders = await fugle.getOrders();

// 取得三個月內的交易明細
const transactions = await fugle.getTransactions('3m');

// 取得帳戶庫存
const inventories = await fugle.getInventories();

// 取得交割資訊
const settlements = await fugle.getSettlements();
```

當您想使用其他帳號登入，或需要重置密碼時，請記得先登出：

```js
await fugle.logout();
```

### 下委託單

為了下委託單，您需要從 `@fugle/trade` 匯入 `Order` 類別：

```js
import { Order } from '@fugle/trade';
```

然後，建立一個代表要下該委託單的 `Order` 物件：

```js
const order = new Order({
  buySell: Order.Side.Buy,
  price: 25.00,
  stockNo: '2884',
  quantity: 3,
  apCode: Order.ApCode.Common,
  priceFlag: Order.PriceFlag.Limit,
  bsFlag: Order.BsFlag.ROD,
  trade: Order.Trade.Cash,
});

// 下單
await fugle.placeOrder(order);
```

關於可用選項的詳細資訊，請至 [`/doc/fugle-trade.md`](./doc/fugle-trade.md#class-order) 查閱。

### 修改或取消委託單

如果想修改或取消委託單，您需要先取得所有進行中的委託單：

```js
const orders = await fugle.getOrders();
```

之後，您可以選擇其中一個委託單來修改或取消它：

```js
const [ order, ...others ] = orders;

// 修改委託價格
await fugle.replacePrice(order, 24.5);

// 修改委託數量
await fugle.replaceQuantity(order, 1);

// 取消委託單
await fugle.cancelOrder(order);
```

### 建立 streamer 連線

streamer 是一個向 Fugle 客戶端提供即時數據的應用程式。如果您想要主動接收委託或成交回報，您需要連接 streamer。

請確認您已經登入，然後與 streamer 連線：

```js
fugle.streamer.connect();
```

`fugle.streamer` 繼承自 `EventEmitter`，允許您註冊事件監聽器以處理觸發事件：

```js
fugle.streamer.on('connect', () => {
  // 建立 streamer 連線
});

fugle.streamer.on('disconnect', () => {
  // 中斷 streamer 連線
});

fugle.streamer.on('order', (data) => {
  // 收到委託回報
});

fugle.streamer.on('trade', (data) => {
  // 收到成交回報
});

fugle.streamer.on('message', (data) => {
  // 收到來自 streamer 的訊息
});

fugle.streamer.on('error', (err) => {
  // 處理錯誤
});
```

如果要中斷與 stream 的連線，只需呼叫：

```js
fugle.streamer.disconnect();
```

## 文件

關於 `@fugle/trade` 用法的詳細說明，請至 [`/doc/fugle-trade.md`](./doc/fugle-trade.md) 查閱。

## 授權

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fugle/trade.svg
[npm-url]: https://npmjs.com/package/@fugle/trade
[action-image]: https://img.shields.io/github/workflow/status/fugle-dev/fugle-trade-node/Node.js%20CI
[action-url]: https://github.com/fugle-dev/fugle-trade-node/actions/workflows/node.js.yml
[codecov-image]: https://img.shields.io/codecov/c/github/fugle-dev/fugle-trade-node.svg
[codecov-url]: https://codecov.io/gh/fugle-dev/fugle-trade-node
