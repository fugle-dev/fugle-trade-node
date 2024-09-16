# @fugle/trade

## 目錄

- [Class: FugleTrade](#class-fugletrade)
  - [Constructor: new FugleTrade(options)](#constructor-new-fugletradeoptions)
  - [fugle.login()](#fuglelogin)
  - [fugle.logout()](#fuglelogout)
  - [fugle.placeOrder(order)](#fugleplaceorderorder)
  - [fugle.getOrders()](#fuglegetorders)
  - [fugle.replacePrice(order, price)](#fuglereplacepriceorder-price)
  - [fugle.replaceQuantity(order, quantity)](#fuglereplacequantityorder-quantity)
  - [fugle.cancelOrder(order)](#fuglecancelorderorder)
  - [fugle.getHistoricalOrders()](#fuglegethistoricalorders)
  - [fugle.getTransactions(options)](#fuglegettransactionsoptions)
  - [fugle.getInventories()](#fuglegetinventories)
  - [fugle.getSettlements()](#fuglegetsettlements)
  - [fugle.getBalance()](#fuglegetbalance)
  - [fugle.getTradeStatus()](#fuglegettradestatus)
  - [fugle.getMarketStatus()](#fuglegetmarketstatus)
  - [fugle.getKeyInfo()](#fuglegetkeyinfo)
  - [fugle.getCertInfo()](#fuglegetcertinfo)
  - [fugle.getMachineTime()](#fuglegetmachinetime)
  - [fugle.streamer](#fuglestreamer)
    - [Event: 'connect'](#event-connect)
    - [Event: 'disconnect'](#event-disconnect)
    - [Event: 'order'](#event-order)
    - [Event: 'trade'](#event-trade)
    - [Event: 'message'](#event-message)
    - [Event: 'error'](#event-error)
  - [fugle.streamer.connect()](#fuglestreamerconnect)
  - [fugle.streamer.disconnect()](#fuglestreamerdisconnect)
- [Class: Order](#class-order)
  - [Class property: Order.Side](#class-property-orderside)
  - [Class property: Order.ApCode](#class-property-orderapcode)
  - [Class property: Order.PriceFlag](#class-property-orderpriceflag)
  - [Class property: Order.BsFlag](#class-property-orderbsflag)
  - [Class property: Order.TradeType](#class-property-ordertradetype)
  - [Constructor new Order(payload)](#constructor-new-orderpayload)
  - [order.setSymbol(symbol)](#ordersetsymbolsymbol)
  - [order.setSide(side)](#ordersetsideside)
  - [order.setPrice(price)](#ordersetpriceprice)
  - [order.setQuantity(quantity)](#ordersetquantityquantity)
  - [order.setApCode(apCode)](#ordersetapcodeapcode)
  - [order.setPriceFlag(priceFlag)](#ordersetpriceflagpriceflag)
  - [order.setBsFlag(bsFlag)](#ordersetbsflagbsflag)
  - [order.setTrade(trade)](#ordersettradetrade)
  - [order.toObject()](#ordertoobject)
  
## Class: FugleTrade

此類別代表使用遠端伺服器服務的客戶端。

### Constructor: `new FugleTrade(options)`

為 `FugleTrade` 設置可配置選項。請注意，必須指定 `configPath` 或 `config` 選項。

- `options` {Object} 為 `FugleTrade` 設置可配置選項。請注意，必須指定 `configPath` 或 `config` 選項。
  - `configPath` {string} 透過路徑載入配置文件。
  - `config` {Object} 設置配置變數。可用的屬性為：
    - `apiUrl` {string} 富果交易 API URL。
    - `apiKey` {string} 富果交易 API 金鑰。
    - `apiSecret` {string} 富果交易 API 私鑰。
    - `certPath` {string} 憑證路徑。
    - `certPass` {string} 憑證密碼。
    - `aid` {string} 證券帳號。
    - `password` {string} 帳號密碼。

建立一個新的 `FugleTrade` 實體。

### `fugle.login()`

- Returns: {Promise} 成功後回傳 `undefined`。

登入到遠端伺服器以開始使用服務。

```js
const { FugleTrade } = require('@fugle/trade');

const fugle = new FugleTrade({ configPath: '/path/to/config.ini' });

fugle.login().then(() => {
  // Do something
});
```

### `fugle.logout()`

- Returns: {Promise} 成功後回傳 `undefined`。

登出並刪除登入帳號的驗證憑據。

```js
fugle.logout().then(() => {
  // Do something
});
```

### `fugle.placeOrder(order)`

- `order` {Order} 要下的委託單。
- Returns: {Promise} 成功後回傳 {PlaceOrderResponse}。

使用登入帳號下委託單。

```js
const { FugleTrade, Order } = require('@fugle/trade');

const fugle = new FugleTrade({ configPath: '/path/to/config.ini' });

fugle.login().then(() => {
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
  fugle.placeOrder(order).then((res) => console.log(res));
});

// Prints:
// {
//   ordDate: '20220310',  // 委託日期
//   ordTime: '094932438', // 委託時間
//   ordType: '2',         // 委託單狀態 (1:預約單 2:盤中單)
//   ordNo: 'A4461',       // 委託序號
//   retCode: '000000',    // 處理結果代碼
//   retMsg: '',           // 錯誤訊息
//   workDate: '20220310'  // 有效交易日期
// }
```

### `fugle.getOrders()`

- Returns: {Promise} 成功後回傳 {OrderResult[]}。

取得登入帳號的現有委託單。

```js
fugle.login().then(() => {
  fugle.getOrders().then(res => console.log(res[0].toObject()));
});

// Prints: 
// {
//   apCode: '1',          // 盤別
//   avgPrice: 0.0,        // 成交均價
//   bsFlag: 'R',          // 委託條件
//   buySell: 'B',         // 買賣別
//   celQty: 1,            // 已取消數量 (張)
//   celQtyShare: 1000,    // 已取消數量 (股)
//   celable: '2',         // 可取消狀態 (1:可取消 2:不可取消)
//   errCode: '00000000',  // 錯誤碼
//   errMsg: '',           // 錯誤訊息
//   matQty: 0,            // 已成交數量 (張)
//   matQtyShare: 0,       // 已成交數量 (股)
//   odPrice: 25.95,       // 委託價格
//   ordDate: '20220310',  // 原始委託日期
//   ordNo: 'A4461',       // 委託書編號
//   ordStatus: '2',       // 預約狀態 (1:預約單 2:盤中單)
//   ordTime: '094932438', // 原始委託時間
//   orgQty: 1,            // 原始委託數量 (張)
//   orgQtyShare: 1000,    // 原始委託數量 (股)
//   preOrdNo: '',         // 預約單編號
//   priceFlag: '2',       // 價格旗標
//   stockNo: '2884',      // 股票代號
//   trade: '0',           // 交易類別
//   workDate: '20220310', // 有效交易日期
//   memo: ''              // 自訂欄位
// }
```

### `fugle.replacePrice(order, price)`

- `order` {PlacedOrder} 要更改的進行中委託單。
- `price` {number | Order.PriceFlag} 更改的價格。
- Returns: {Promise} 成功後回傳 {ReplaceOrderResponse}。

更改登入帳號的進行中委託單的價格。

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    fugle.replacePrice(order, 24.5).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // 處理結果代碼
//   retMsg: '',          // 錯誤訊息
//   ordDate: '20220310', // 修改委託日期
//   ordTime: '104605207' // 修改委託時間
// }
```

### `fugle.replaceQuantity(order, quantity)`

- `order` {PlacedOrder} 要更改的進行中委託單。
- `quantity` {number} 更改的數量。
- Returns: {Promise} 成功後回傳 {ReplaceOrderResponse}。

更改登入帳號的進行中委託單的數量。

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    fugle.replaceQuantity(order, 1).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // 處理結果代碼
//   retMsg: '',          // 錯誤訊息
//   ordDate: '20220310', // 修改委託日期
//   ordTime: '104605207' // 修改委託時間
// }
```

### `fugle.replaceOrder(order, options)`

- `order` {PlacedOrder} 要更改的進行中委託單。
- `options` {Object} 設置可配置的選項來更改委託單。
  - `price` {number | Order.PriceFlag} 更改的價格。
  - `quantity` {number} 更改的數量。
- Returns: {Promise} 成功後回傳 {ReplaceOrderResponse}。

更改登入帳號的進行中委託單的價格或數量。請注意，必須指定 `price` 或 `quantity` 選項，且只有一個選項可以被指定。

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    const options = { price: 24.5 , quantity: 1 };
    fugle.replaceOrder(order, options).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // 處理結果代碼
//   retMsg: '',          // 錯誤訊息
//   ordDate: '20220310', // 修改委託日期
//   ordTime: '104605207' // 修改委託時間
// }
```

### `fugle.cancelOrder(order)`

- `order` {PlacedOrder} 要取消的進行中委託單。
- Returns: {Promise} 成功後回傳 {ReplaceOrderResponse}。

取消登入帳號的進行中委託單。

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    fugle.cancelOrder(order).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // 處理結果代碼
//   retMsg: '',          // 錯誤訊息
//   ordDate: '20220310', // 修改委託日期
//   ordTime: '104605207' // 修改委託時間
// }
```

### `fugle.getHistoricalOrders()`

- `options` {Object} 設置可配置的選項取得歷史委託單。
  - `startDate` {string} 開始日期。
  - `endDate` {string} 結束日期。
- Returns: {Promise} 成功後回傳 {OrderResult[]}。

取得登入帳號的歷史委託單。

```js
fugle.login().then(() => {
  const options = { startDate: '2022-03-01', endDate: '2022-03-31' };
  fugle.getHistoricalOrders().then(res => console.log(res[0].toObject()));
});

// Prints: 
// {
//   apCode: '1',          // 盤別
//   avgPrice: 0.0,        // 成交均價
//   bsFlag: 'R',          // 委託條件
//   buySell: 'B',         // 買賣別
//   celQty: 1,            // 已取消數量 (張)
//   celQtyShare: 1000,    // 已取消數量 (股)
//   celable: '2',         // 可取消狀態 (1:可取消 2:不可取消)
//   errCode: '00000000',  // 錯誤碼
//   errMsg: '',           // 錯誤訊息
//   matQty: 0,            // 已成交數量 (張)
//   matQtyShare: 0,       // 已成交數量 (股)
//   odPrice: 25.95,       // 委託價格
//   ordDate: '20220310',  // 原始委託日期
//   ordNo: 'A4461',       // 委託書編號
//   ordStatus: '2',       // 預約狀態 (1:預約單 2:盤中單)
//   ordTime: '094932438', // 原始委託時間
//   orgQty: 1,            // 原始委託數量 (張)
//   orgQtyShare: 1000,    // 原始委託數量 (股)
//   preOrdNo: '',         // 預約單編號
//   priceFlag: '2',       // 價格旗標
//   stockNo: '2884',      // 股票代號
//   trade: '0',           // 交易類別
//   workDate: '20220310', // 有效交易日期
//   memo: ''              // 自訂欄位
// }
```

### `fugle.getTransactions(options)`

- `options` {Object} 設置可配置的選項取得成交明細。
  - `duration` {string} 可設定 `0d` (日內), `3d` (近三日), `1m` (近一月) 或 `3m` (近三月)。
  - `startDate` {string} 開始日期。
  - `endDate` {string} 結束日期。
- Returns: {Promise} 成功後回傳 {Trade[]}。

取得登入帳號的成交明細。

```js
fugle.login().then(() => {
  fugle.getTransactions({ duration: '0d' }).then(res => console.log(res[0]));
});

// Prints:
// {                                // <匯總>
//   buySell: 'S',                  // 買賣別
//   cDate: '20220314',             // 交割日期
//   cost: '-16410',                // 已實現損益成本小計
//   make: '7933',                  // 已實現損益
//   makePer: '48.34',              // 已實現獲利率
//   priceAvg: '24.45',             // 成交均價
//   priceQty: '24450',             // 價金小計
//   qty: '1000',                   // 成交數量
//   recv: '24343',                 // 已實現損益收入小計
//   stkNa: '玉山金',                // 股票名稱
//   stkNo: '2884',                 // 股票代號
//   sType: 'H',                    // 市場別 (H:上市 O:上櫃 R:興櫃)
//   tDate: '20220310',             // 成交日期
//   trade: '0'                     // 交易類別 (0:現股 3:融資 4:融券 A:現股當沖賣)
//   matDats: [
//     {                            // <明細>
//       buySell: 'S',              // 買賣別
//       cDate: '20220314',         // 交割日期
//       dbFee: '0',                // 融券手續費
//       fee: '34',                 // 手續費
//       make: '7933',              // 已實現損益
//       makePer: '48.34',          // 已實現獲利率
//       orderNo: 'A7828002924570', // 委託書編號
//       payN: '24343',             // 淨收付款
//       price: '24.45',            // 成交價格
//       priceQty: '24450',         // 價金
//       qty: '1000',               // 成交數量
//       sType: 'H',                // 市場別 (H:上市 O:上櫃 R:興櫃)
//       stkNa: '玉山金',            // 股票名稱
//       stkNo: '2884',             // 股票代號
//       tDate: '20220310',         // 成交日期
//       tTime: '090819800',        // 成交時間
//       tax: '73',                 // 交易稅
//       taxG: '0',                 // 證所稅
//       trade: '0',                // 交易類別 (0:現股 3:融資 4:融券 A:現股當沖賣)
//       memo: ''                   // 自訂欄位
//     }
//   ]
// }
```

### `fugle.getInventories()`

- Returns: {Promise} 成功後回傳 {Stock[]}。

取得登入帳號的現有庫存。

```js
fugle.login().then(() => {
  fugle.getInventories().then(res => console.log(res[0]));
});

// Prints:
// {
//   apCode: '',                  // 盤別
//   costQty: '1150',             // 成本股數
//   costSum: '-103235',          // 成本總計
//   makeAPer: '51.59',           // 未實現獲利率
//   makeASum: '53255',           // 未實現損益小計
//   priceAvg: '89.63',           // 成交均價
//   priceEvn: '89.99',           // 損益平衡價
//   priceMkt: '136.45',          // 即時價格 (無假除權息)
//   priceNow: '136.45',          // 即時價格 (有假除權息)
//   priceQtySum: '103074',       // 價金總計
//   qtyB: '0',                   // 今委買股數
//   qtyBm: '0',                  // 今委買成交股數
//   qtyC: '0',                   // 調整股數 (現償/匯撥)
//   qtyL: '1150',                // 昨餘額股數
//   qtyS: '0',                   // 今委賣股數
//   qtySm: '0',                  // 今委賣成交股數
//   recVaSum: '156490',          // 未實現收入小計
//   stkNa: '元大台灣50',          // 股票名稱
//   stkNo: '0050',               // 股票代碼
//   sType: 'H',                  // 市場別 (H:上市 O:上櫃 R:興櫃)
//   trade: '0',                  // 交易類別
//   valueMkt: '13645',           // 市值 (無假除權息)
//   valueNow: '13645'            // 市值 (有假除權息)
//   stkDats: [
//     { 
//       buySell: 'B',
//       costR: '0',              // 已分攤成本
//       fee: '18',               // 手續費
//       makeA: '804',            // 未實現損益
//       makeAPer: '6.28',        // 未實現獲益率
//       ordNo: 'D3660038938518', // 委託書編號
//       payN: '-12808',          // 淨收付金額
//       price: '127.90',         // 成交價格
//       priceEvn: '128.41',      // 平衡損益價
//       qty: '100',              // 庫存股數
//       qtyC: '0',               // 調整股數 (現償/匯撥)
//       qtyH: '0',               // 實高權值股數 (維持率)
//       qtyR: '0',               // 已分攤股數
//       tDate: '20210512',       // 成交日期
//       tTime: '',               // 成交時間
//       tax: '0',                // 交易稅
//       taxG: '0',               // 證所稅
//       trade: '0',              // 交易類別
//       valueMkt: '13645',       // 市值 (無假除權息)
//       valueNow: '13645',       // 市值 (有假除權息)
//       memo: ''                 // 自訂欄位
//   }]
// }
```

### `fugle.getSettlements()`

- Returns: {Promise} 成功後回傳 {Settlement[]}。

取得登入帳號的交割資訊。

```js
fugle.login().then(() => {
  fugle.getSettlements().then(res => console.log(res[0]));
});

// Prints:
// {
//   cDate: '20220310', // 交割日期
//   date: '20220308',  // 成交日期
//   price: '-80912'    // 交割款應收付金額
// }
```

### `fugle.getBalance()`

- Returns: {Promise} 成功後回傳 {BalanceStatus}。

取得登入帳號的銀行帳戶餘額。

```js
fugle.login().then(() => {
  fugle.getBalance().then(res => console.log(res));
});

// Prints:
// {
//   availableBalance: 500000,   // 可用銀行餘額
//   exchangeBalance: 100000,    // 今日票據交換金額
//   stockPreSaveAmount: 100000, // 圈存金額
//   isLatestData: true,         // 最新資料
//   updatedAt: 1676735999       // 更新時間
// }
```

### `fugle.getTradeStatus()`

- Returns: {Promise} 成功後回傳 {TradeStatus}。

取得登入帳號的交易額度以及信用交易等資訊。

```js
fugle.login().then(() => {
  fugle.getTradeStatus().then(res => console.log(res));
});

// Prints:
// {
//   tradeLimit: 0,       // 交易額度
//   marginLimit: 500000, // 融資額度
//   shortLimit: 500000,  // 融券額度
//   dayTradeCode: 'X',   // 現股當沖狀態代碼 (X:已啟用 Y:僅可先買後賣 N:未啟用 S:暫停中)
//   marginCode: '0',     // 融資狀態代碼 (0:可買賣 1:可買 2:可賣 9:不可買賣)
//   shortCode: '0'       // 融券狀態代碼 (0:可買賣 1:可買 2:可賣 9:不可買賣)
// }
```

### `fugle.getMarketStatus()`

- Returns: {Promise} 成功後回傳 {MarketStatus}。

取得市場開盤狀態。

```js
fugle.login().then(() => {
  fugle.getMarketStatus().then(res => console.log(res));
});

// Prints:
// {
//   isTradingDay: true,         // 當日是否開盤
//   lastTradingDay: '20221017', // 上個交易日期
//   nextTradingDay: '20221019'  // 下個交易日期
// }
```

### `fugle.getKeyInfo()`

- Returns: {Promise} 成功後回傳 {KeyInfo}。

取得登入帳號的 API 金鑰資訊。

```js
fugle.login().then(() => {
  fugle.getKeyInfo().then(res => console.log(res));
});

// Prints:
// {
//   apiKey: 'XXXXXXXXXXXXX', // API 金鑰
//   apiKeyMemo: '',          // API 金鑰備註
//   apiKeyName: '',          // API 金鑰名稱
//   createdAt: { nanos: 683000000, seconds: 1720359631 }, // API 金鑰建立時間
//   scope: 'C',              // API 金鑰權限
//   status: 1                // API 金鑰狀態
// }
```

### `fugle.getCertInfo()`

- Returns: {Promise} 成功後回傳 {CertInfo}。

取得憑證資訊。

```js
fugle.getCertInfo().then(res => console.log(res));

// Prints:
// {
//   serial: '7DA4C168'              // 憑證序號
//   isValid: true,                  // 憑證有效
//   notAfter: 1676735999,           // 憑證有效期限
//   cn: 'A123456789-00-00::PCC005'  // 憑證名稱
// }
```

### `fugle.getMachineTime()`

- Returns: {Promise} 成功後回傳 {string}。

取得遠端伺服器的機器時間。請注意，如果下單程式所在的機器時間與遠端伺服器的機器時間相差太大，有可能導致下單驗證失敗。

```js
fugle.getMachineTime().then(res => console.log(res));

// Prints: 2022-03-10 10:23:48.464
```

### `fugle.streamer`

- {Streamer}

一個繼承於 `EventEmitter` 的類別實體，並包含 `ws.WebSocket` 來處理 WebSocket 連線。

### Event: `'connect'`

當連線建立時觸發。

### Event: `'disconnect'`

當連線關閉時觸發。

### Event: `'order'`

- `data` {string} 委託回報的訊息內容。

當委託確認時觸發。收到的 `data` 是委託回報的訊息內容。

### Event: `'trade'`

- `data` {string} 成交回報的訊息內容。

當執行委託時觸發。收到的 `data` 是成交回報的訊息內容。

### Event: `'message'`

- `data` {string} 來自 streamer 的訊息內容。

當收到訊息時觸發。

### Event: `'error'`

- `error` {Error}

當發生錯誤時觸發。

### `fugle.streamer.connect()`

建立與遠端伺服器的連線。

### `fugle.streamer.disconnect()`

中斷與遠端伺服器的連線。

## Class: `Order`

此類別代表要下的委託單。

### Class property: `Order.Side`

- {enum}

| Key    | Value | Description |
| ------ | ----- | ----------- |
| `Buy`  | `'B'` | 買進         |
| `Sell` | `'S'` | 賣出         |

### Class property: `Order.ApCode`

- {enum}

| Key           | Value | Description |
| ------------- | ----- | ------------|
| `Common`      | `'1'` | 盤中整股     |
| `AfterMarket` | `'2'` | 盤後定價     |
| `Odd`         | `'3'` | 盤後零股     |
| `Emg`         | `'4'` | 興櫃        |
| `IntradayOdd` | `'5'` | 盤中零股     |

### Class property: `Order.PriceFlag`

- {enum}

| Key         | Value | Description |
| ----------- | ----- | ----------- |
| `Limit`     | `'0'` | 限價         |
| `Flat`      | `'1'` | 平盤價       |
| `LimitDown` | `'2'` | 跌停價       |
| `LimitUp`   | `'3'` | 漲停價       |
| `Market`    | `'4'` | 市價         |

### Class property: `Order.BsFlag`

- {enum}

| Key   | Value | Description         |
| ----- | ----- | ------------------- |
| `ROD` | `'R'` | 當日委託有效單        |
| `IOC` | `'I'` | 立即成交否則取消      |
| `FOK` | `'F'` | 立即全部成交否則取消   |

### Class property: `Order.TradeType`

- {enum}

| Key              | Value | Description |
| ---------------- | ----- | ------------|
| `Cash`           | `'0'` | 現股         |
| `Margin`         | `'3'` | 融資         |
| `Short`          | `'4'` | 融券         |
| `DayTrading`     | `'9'` | 自動當沖      |
| `DayTradingSell` | `'A'` | 現股當沖賣    |

### Constructor: `new Order(payload)`

- `payload` {Object} 設置委託單的酬載。
  - `stockNo` {string} 股票代號。
  - `buySell` {Order.Side} 買賣別。
  - `price` {number} 價格。
  - `quantity` {number} 數量。
  - `apCode` {Order.ApCode} 盤別。
  - `priceFlag` {Order.PriceFlag} 價格旗標。
  - `bsFlag` {Order.BsFlag} 委託單別。
  - `trade` {Order.TradeType} 交易類別。

建立一個新的 `Order` 實體。

### `order.payload`

- {Object}
  - `stockNo` {string} 股票代號。
  - `buySell` {Order.Side} 買賣別。
  - `price` {number} 價格。
  - `quantity` {number} 數量。
  - `apCode` {Order.ApCode} 盤別。
  - `priceFlag` {Order.PriceFlag} 價格旗標。
  - `bsFlag` {Order.BsFlag} 委託單別。
  - `trade` {Order.TradeType} 交易類別。

委託單的酬載。

### `order.setSymbol(symbol)`

- `symbol` {string} 股票代號。
- Returns: {this}

設置委託單酬載的 `stockNo` 值。

### `order.setSide(side)`

- `side` {Order.Side} 買賣別。
- Returns: {this}

設置委託單酬載的 `buySell` 值。

### `order.setPrice(price)`

- `price` {number} 價格。
- Returns: {this}

設置委託單酬載的 `price` 值。

### `order.setQuantity(quantity)`

- `quantity` {number} 數量。
- Returns: {this}

設置委託單酬載的 `quantity` 值。

### `order.setApCode(apCode)`

- `apCode` {Order.ApCode} 盤別。
- Returns: {this}

設置委託單酬載的 `apCode` 值。

### `order.setPriceFlag(priceFlag)`

- `priceFlag` {Order.PriceFlag} 價格旗標。
- Returns: {this}

設置委託單酬載的 `priceFlag` 值。

### `order.setBsFlag(bsFlag)`

- `bsFlag` {Order.BsFlag} 委託單別。
- Returns: {this}

設置委託單酬載的 `bsFlag` 值。

### `order.setTradeType(tradeType)`

- `tradeType` {Order.TradeType} 交易類別。
- Returns: {this}

設置委託單酬載的 `trade` 值。

### `order.toObject()`

- Returns: {OrderObject}

轉換為 `@fugle/trade-core` 的 `OrderObject` 物件。
