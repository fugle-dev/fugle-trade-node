# @fugle/trade

## 目錄

- [Class: FugleTrade](#class-fugletrade)
  - [Constructor: new FugleTrade(options)](#constructor-new-fugletradeoptions)
  - [fugle.login()](#fuglelogin)
  - [fugle.logout()](#fuglelogout)
  - [fugle.placeOrder(order)](#fugleplaceorderorder)
  - [fugle.replacePrice(order, price)](#fuglereplacepriceorder-price)
  - [fugle.replaceQuantity(order, quantity)](#fuglereplacequantityorder-quantity)
  - [fugle.cancelOrder(order)](#fuglecancelorderorder)
  - [fugle.getOrders()](#fuglegetorders)
  - [fugle.getTransactions(options)](#fuglegettransactionsoptions)
  - [fugle.getInventories()](#fuglegetinventories)
  - [fugle.getSettlements()](#fuglegetsettlements)
  - [fugle.getBalance()](#fuglegetbalance)
  - [fugle.getTradeStatus()](#fuglegettradestatus)
  - [fugle.getMarketStatus()](#fuglegetmarketstatus)
  - [fugle.getKeyInfo()](#fuglegetkeyinfo)
  - [fugle.getMachineTime()](#fuglegetmachinetime)
  - [fugle.getCertInfo()](#fuglegetcertinfo)
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

- 回傳: {Promise} 成功時將使用 `undefined` 履行。

登入到遠端伺服器以開始使用服務。

### `fugle.logout()`

- 回傳: {Promise} 成功時將使用 `undefined` 履行。

登出並刪除登入帳號的驗證憑據。

### `fugle.placeOrder(order)`

- `order` {Order} 要下的委託單。
- 回傳: {Promise} 成功時將使用 {PlaceOrderResponse} 履行。

使用登入帳號下委託單。

### `fugle.replacePrice(order, price)`

- `order` {PlacedOrder} 要更改的進行中委託單。
- `price` {number | Order.PriceFlag} 更改的價格。
- 回傳: {Promise} 成功時將使用 {ReplaceOrderResponse} 履行。

更改登入帳號的進行中委託單的價格。

### `fugle.replaceQuantity(order, quantity)`

- `order` {PlacedOrder} 要更改的進行中委託單。
- `quantity` {number} 更改的數量。
- 回傳: {Promise} 成功時將使用 {ReplaceOrderResponse} 履行。

更改登入帳號的進行中委託單的數量。

### `fugle.replaceOrder(order, options)`

- `order` {PlacedOrder} 要更改的進行中委託單。
- `options` {Object} 設置可配置的選項來更改委託單。
  - `price` {number | Order.PriceFlag} 更改的價格。
  - `quantity` {number} 更改的數量。
- 回傳: {Promise} 成功時將使用 {ReplaceOrderResponse} 履行。

更改登入帳號的進行中委託單的價格或數量。請注意，必須指定 `price` 或 `quantity` 選項，且只有一個選項可以被指定。

### `fugle.cancelOrder(order)`

- `order` {PlacedOrder} 要取消的進行中委託單。
- 回傳: {Promise} 成功時將使用 {ReplaceOrderResponse} 履行。

取消登入帳號的進行中委託單。

### `fugle.getOrders()`

- 回傳: {Promise} 成功時將使用 {OrderResult[]} 履行。

取得登入帳號的現有委託單。

### `fugle.getTransactions(options)`

- `options` {Object} 設置可配置的選項取得成交明細。
  - `duration` {string} 可設定 `0d` (日內), `3d` (近三日), `1m` (近一月) 或 `3m` (近三月)。
  - `startDate` {string} 開始日期。
  - `endDate` {string} 結束日期。
- 回傳 {Promise} 成功時將使用 {Trade[]} 履行。

取得登入帳號的成交明細。

### `fugle.getInventories()`

- 回傳: {Promise} 成功時將使用 {Stock[]} 履行。

取得登入帳號的現有庫存。

### `fugle.getSettlements()`

- 回傳: {Promise} 成功時將使用 {Settlement[]} 履行。

取得登入帳號的交割資訊。

### `fugle.getBalance()`

- 回傳: {Promise} 成功時將使用 {BalanceStatus} 履行。

取得登入帳號的銀行帳戶餘額。

### `fugle.getTradeStatus()`

- 回傳: {Promise} 成功時將使用 {TradeStatus} 履行。

取得登入帳號的交易額度以及信用交易等資訊。

### `fugle.getMarketStatus()`

- 回傳: {Promise} 成功時將使用 {MarketStatus} 履行。

取得市場開盤狀態。

### `fugle.getKeyInfo()`

- 回傳: {Promise} 成功時將使用 {KeyInfo} 履行。

取得登入帳號的 API 金鑰資訊。

### `fugle.getMachineTime()`

- 回傳: {Promise} 成功時將使用 {string} 履行。

取得遠端伺服器的機器時間。請注意，如果下單程式所在的機器時間與遠端伺服器的機器時間相差太大，有可能導致下單驗證失敗。

### `fugle.getCertInfo()`

- 回傳: {Promise} 成功時將使用 {CertInfo} 履行。

取得憑證資訊。

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
- 回傳: {this}

設置委託單酬載的 `stockNo` 值。

### `order.setSide(side)`

- `side` {Order.Side} 買賣別。
- 回傳: {this}

設置委託單酬載的 `buySell` 值。

### `order.setPrice(price)`

- `price` {number} 價格。
- 回傳: {this}

設置委託單酬載的 `price` 值。

### `order.setQuantity(quantity)`

- `quantity` {number} 數量。
- 回傳: {this}

設置委託單酬載的 `quantity` 值。

### `order.setApCode(apCode)`

- `apCode` {Order.ApCode} 盤別。
- 回傳: {this}

設置委託單酬載的 `apCode` 值。

### `order.setPriceFlag(priceFlag)`

- `priceFlag` {Order.PriceFlag} 價格旗標。
- 回傳: {this}

設置委託單酬載的 `priceFlag` 值。

### `order.setBsFlag(bsFlag)`

- `bsFlag` {Order.BsFlag} 委託單別。
- 回傳: {this}

設置委託單酬載的 `bsFlag` 值。

### `order.setTradeType(tradeType)`

- `tradeType` {Order.TradeType} 交易類別。
- 回傳: {this}

設置委託單酬載的 `trade` 值。

### `order.toObject()`

- 回傳: {OrderObject}

轉換為 `@fugle/trade-core` 的 `OrderObject` 物件。
