# @fugle/trade

## Table of Contents

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

This class represents a client that uses remote services from the server.

### Constructor: `new FugleTrade(options)`

- `options` {Object} Set of configurable options to set on the `FugleTrade`. Note that one and only one of the `configPath` or `config` options must be specified.
  - `configPath` {string} To load configuration file by path.
  - `config` {Object} Set configuration variables. Available properties are:
    - `apiUrl` {string} FugleTrade API URL.
    - `apiKey` {string} FugleTrade API key.
    - `apiSecret` {string} FugleTrade API secret.
    - `certPath` {string} The path of certificate.
    - `certPass` {string} The certificate password.
    - `aid` {string} The account ID.
    - `password` {string} The account password.

Create a new `FugleTrade` instance.

### `fugle.login()`

- Returns: {Promise} Fulfills with `undefined` upon success.

Log in to the remote server to begin using services.

```js
const { FugleTrade } = require('@fugle/trade');

const fugle = new FugleTrade({ configPath: '/path/to/config.ini' });

fugle.login().then(() => {
  // Do something
});
```

### `fugle.logout()`

- Returns: {Promise} Fulfills with `undefined` upon success.

Log out and remove the credentials of the logged in account.

```js
fugle.logout().then(() => {
  // Do something
});
```

### `fugle.placeOrder(order)`

- `order` {Order} The order to be placed.
- Returns: {Promise} Fulfills with an {PlaceOrderResponse} upon success.

Place an order for the logged in account.

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
//   ordDate: '20220310',  // order date
//   ordTime: '094932438', // order time
//   ordType: '2',         // order status (1: pre-scheduled order, 2: intraday order)
//   ordNo: 'A4461',       // order number
//   retCode: '000000',    // result code
//   retMsg: '',           // error message
//   workDate: '20220310'  // valid transaction date
// }
```

### `fugle.getOrders()`

- Returns: {Promise} Fulfills with {PlacedOrder[]} upon success.

Gets existing orders of the logged account.

```js
fugle.login().then(() => {
  fugle.getOrders().then(res => console.log(res[0].toObject()));
});

// Prints: 
// {
//   apCode: '1',          // market type
//   avgPrice: 0.0,        // average transaction price
//   bsFlag: 'R',          // order condition
//   buySell: 'B',         // buy/sell indicator
//   celQty: 1,            // cancelled quantity (lots)
//   celQtyShare: 1000,    // cancelled quantity (shares)
//   celable: '2',         // cancellable status (1: cancellable, 2: not cancellable)
//   errCode: '00000000',  // error code
//   errMsg: '',           // error message
//   matQty: 0,            // matched quantity (lots)
//   matQtyShare: 0,       // matched quantity (shares)
//   odPrice: 25.95,       // order price
//   ordDate: '20220310',  // original order date
//   ordNo: 'A4461',       // order number
//   ordStatus: '2',       // order status (1: pre-scheduled, 2: intraday)
//   ordTime: '094932438', // original order time
//   orgQty: 1,            // original order quantity (lots)
//   orgQtyShare: 1000,    // original order quantity (shares)
//   preOrdNo: '',         // pre-scheduled order number
//   priceFlag: '2',       // price flag
//   stockNo: '2884',      // stock code
//   trade: '0',           // trade type
//   workDate: '20220310', // valid transaction date
//   memo: ''              // custom field
// }
```

### `fugle.replacePrice(order, price)`

- `order` {PlacedOrder | Order.PriceFlag} The working order to be replaced.
- `price` {number} The price of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order to change price for the logged in account.

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    fugle.replacePrice(order, 24.5).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // result code
//   retMsg: '',          // error message
//   ordDate: '20220310', // modified order date
//   ordTime: '104605207' // modified order time
// }
```

### `fugle.replaceQuantity(order, quantity)`

- `order` {PlacedOrder} The working order to be replaced.
- `quantity` {number} The price of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order to change quantity for the logged in account.

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    fugle.replaceQuantity(order, 1).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // result code
//   retMsg: '',          // error message
//   ordDate: '20220310', // modified order date
//   ordTime: '104605207' // modified order time
// }
```

### `fugle.replaceOrder(order, options)`

- `order` {PlacedOrder} The working order to be replaced.
- `options` {Object} Set of configurable options to replace the order.
  - `price` {number | Order.PriceFlag} The price of replace.
  - `quantity` {number} The quantity of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order for the logged in account. Note that one and only one of the `price` or `quantity` options must be specified.

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
//   retCcode: '000000',  // result code
//   retMsg: '',          // error message
//   ordDate: '20220310', // modified order date
//   ordTime: '104605207' // modified order time
// }
```

### `fugle.cancelOrder(order)`

- `order` {PlacedOrder} The working order to be canceled.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Cancel the order for the logged in account.

```js
fugle.login().then(() => {
  fugle.getOrders().then(orders => {
    const [ order, ...others ] = orders;
    fugle.cancelOrder(order).then(res => console.log(res));
  });
});

// Prints:
// {
//   retCcode: '000000',  // result code
//   retMsg: '',          // error message
//   ordDate: '20220310', // modified order date
//   ordTime: '104605207' // modified order time
// }
```

### `fugle.getHistoricalOrders()`

- `options` {Object} Set of configurable options to get historical orders.
  - `startDate` {string} The start date.
  - `endDate` {string} The end date.
- Returns: {Promise} Fulfills with {PlacedOrder[]} upon success.

Gets historical orders of the logged account.

```js
fugle.login().then(() => {
  const options = { startDate: '2022-03-01', endDate: '2022-03-31' };
  fugle.getHistoricalOrders().then(res => console.log(res[0].toObject()));
});

// Prints: 
// {
//   apCode: '1',          // market type
//   avgPrice: 0.0,        // average transaction price
//   bsFlag: 'R',          // order condition
//   buySell: 'B',         // buy/sell indicator
//   celQty: 1,            // cancelled quantity (lots)
//   celQtyShare: 1000,    // cancelled quantity (shares)
//   celable: '2',         // cancellable status (1: cancellable, 2: not cancellable)
//   errCode: '00000000',  // error code
//   errMsg: '',           // error message
//   matQty: 0,            // matched quantity (lots)
//   matQtyShare: 0,       // matched quantity (shares)
//   odPrice: 25.95,       // order price
//   ordDate: '20220310',  // original order date
//   ordNo: 'A4461',       // order number
//   ordStatus: '2',       // order status (1: pre-scheduled, 2: intraday)
//   ordTime: '094932438', // original order time
//   orgQty: 1,            // original order quantity (lots)
//   orgQtyShare: 1000,    // original order quantity (shares)
//   preOrdNo: '',         // pre-scheduled order number
//   priceFlag: '2',       // price flag
//   stockNo: '2884',      // stock code
//   trade: '0',           // trade type
//   workDate: '20220310', // valid transaction date
//   memo: ''              // custom field
// }
```

### `fugle.getTransactions(options)`

- `options` {Object} Set of configurable options to get transactions.
  - `duration` {string} Available duration is `0d`, `3d`, `1m` or `3m`. 
  - `startDate` {string} The start date.
  - `endDate` {string} The end date.
- Returns: {Promise} Fulfills with {Trade[]} upon success.

Gets transactions of the logged account.

```js
fugle.login().then(() => {
  fugle.getTransactions({ duration: '0d' }).then(res => console.log(res[0]));
});

// Prints:
// {                                // <summary>
//   buySell: 'S',                  // buy/sell indicator
//   cDate: '20220314',             // settlement date
//   cost: '-16410',                // realized loss cost subtotal
//   make: '7933',                  // realized profit
//   makePer: '48.34',              // realized profit percentage
//   priceAvg: '24.45',             // average transaction price
//   priceQty: '24450',             // total amount
//   qty: '1000',                   // transaction quantity
//   recv: '24343',                 // realized income subtotal
//   stkNa: 'E.SUN FHC',            // stock name
//   stkNo: '2884',                 // stock code
//   sType: 'H',                    // market type (H: TSE O: OTC R: Emerging)
//   tDate: '20220310',             // transaction date
//   trade: '0',                    // trade type (0: spot stock 3: margin purchase 4: short sale A: day trading sell)
//   matDats: [
//     {                            // <details>
//       buySell: 'S',              // buy/sell indicator
//       cDate: '20220314',         // settlement date
//       dbFee: '0',                // short sale handling fee
//       fee: '34',                 // handling fee
//       make: '7933',              // realized profit
//       makePer: '48.34',          // realized profit percentage
//       orderNo: 'A7828002924570', // order number
//       payN: '24343',             // net amount
//       price: '24.45',            // transaction price
//       priceQty: '24450',         // total amount
//       qty: '1000',               // transaction quantity
//       sType: 'H',                // market type (H: TSE O: OTC R: Emerging)
//       stkNa: 'E.SUN FHC',        // stock name
//       stkNo: '2884',             // stock code
//       tDate: '20220310',         // transaction date
//       tTime: '090819800',        // transaction time
//       tax: '73',                 // transaction tax
//       taxG: '0',                 // securities transaction tax
//       trade: '0',                // trade type (0: spot stock 3: margin purchase 4: short sale A: day trading sell)
//       memo: ''                   // custom field
//     }
//   ]
// }
```

### `fugle.getInventories()`

- Returns: {Promise} Fulfills with {Stock[]} upon success.

Gets inventories of the logged account.

```js
fugle.login().then(() => {
  fugle.getInventories().then(res => console.log(res[0]));
});

// Prints:
// {
//   apCode: '',                  // market type
//   costQty: '1150',             // cost quantity
//   costSum: '-103235',          // total cost
//   makeAPer: '51.59',           // unrealized profit percentage
//   makeASum: '53255',           // unrealized profit subtotal
//   priceAvg: '89.63',           // average transaction price
//   priceEvn: '89.99',           // break-even price
//   priceMkt: '136.45',          // current price (excluding dividend adjustments)
//   priceNow: '136.45',          // current price (including dividend adjustments)
//   priceQtySum: '103074',       // total price amount
//   qtyB: '0',                   // today's buy order quantity
//   qtyBm: '0',                  // today's executed buy quantity
//   qtyC: '0',                   // adjusted quantity (cash compensation / transfer)
//   qtyL: '1150',                // previous day's remaining quantity
//   qtyS: '0',                   // today's sell order quantity
//   qtySm: '0',                  // today's executed sell quantity
//   recVaSum: '156490',          // unrealized income subtotal
//   stkNa: '元大台灣50',          // stock name
//   stkNo: '0050',               // stock code
//   sType: 'H',                  // market type (H: TWSE O: OTC R: Emerging)
//   trade: '0',                  // trade type
//   valueMkt: '13645',           // market value (excluding dividend adjustments)
//   valueNow: '13645',           // market value (including dividend adjustments)
//   stkDats: [
//     { 
//       buySell: 'B',
//       costR: '0',              // apportioned cost
//       fee: '18',               // handling fee
//       makeA: '804',            // unrealized profit
//       makeAPer: '6.28',        // unrealized profit percentage
//       ordNo: 'D3660038938518', // order number
//       payN: '-12808',          // net amount
//       price: '127.90',         // transaction price
//       priceEvn: '128.41',      // break-even price
//       qty: '100',              // stock quantity
//       qtyC: '0',               // adjusted quantity (cash compensation / transfer)
//       qtyH: '0',               // quantity with high maintenance ratio
//       qtyR: '0',               // apportioned quantity
//       tDate: '20210512',       // transaction date
//       tTime: '',               // transaction time
//       tax: '0',                // transaction tax
//       taxG: '0',               // securities transaction tax
//       trade: '0',              // trade type
//       valueMkt: '13645',       // market value (excluding dividend adjustments)
//       valueNow: '13645',       // market value (including dividend adjustments)
//       memo: ''                 // custom field
//   }]
// }
```

### `fugle.getSettlements()`

- Returns: {Promise} Fulfills with {Settlement[]} upon success.

Gets incoming settlements of the logged account.

```js
fugle.login().then(() => {
  fugle.getSettlements().then(res => console.log(res[0]));
});

// Prints:
// {
//   cDate: '20220310', // settlement date
//   date: '20220308',  // transaction date
//   price: '-80912'    // settlement amount payable/receivable
// }
```

### `fugle.getBalance()`

- Returns: {Promise} Fulfills with an {BalanceStatus} upon success.

Gets bank account balance of the logged account.

```js
fugle.login().then(() => {
  fugle.getBalance().then(res => console.log(res));
});

// Prints:
// {
//   availableBalance: 500000,   // available bank balance
//   exchangeBalance: 100000,    // today's exchange amount
//   stockPreSaveAmount: 100000, // reserved amount
//   isLatestData: true,         // is the data up-to-date
//   updatedAt: 1676735999       // last updated timestamp
// }
```

### `fugle.getTradeStatus()`

- Returns: {Promise} Fulfills with an {TradeStatus} upon success.

Gets trading quota and margin transaction information of the logged account.

```js
fugle.login().then(() => {
  fugle.getTradeStatus().then(res => console.log(res));
});

// Prints:
// {
//   tradeLimit: 0,       // trading limit
//   marginLimit: 500000, // margin limit
//   shortLimit: 500000,  // short selling limit
//   dayTradeCode: 'X',   // day trading status code (X: enabled Y: buy first, sell only N: disabled S: paused)
//   marginCode: '0',     // margin trading status code (0: tradable 1: buy only 2: sell only 9: not tradable)
//   shortCode: '0'       // short selling status code (0: tradable 1: buy only 2: sell only 9: not tradable)
// }
```

### `fugle.getMarketStatus()`

- Returns: {Promise} Fulfills with an {MarketStatus} upon success.

Gets market open status.

```js
fugle.login().then(() => {
  fugle.getMarketStatus().then(res => console.log(res));
});

// Prints:
// {
//   isTradingDay: true,         // is the market open today
//   lastTradingDay: '20221017', // previous trading date
//   nextTradingDay: '20221019'  // next trading date
// }
```

### `fugle.getKeyInfo()`

- Returns: {Promise} Fulfills with an {KeyInfo} upon success.

Gets API key information of the logged account.

```js
fugle.login().then(() => {
  fugle.getKeyInfo().then(res => console.log(res));
});

// Prints:
// {
//   apiKey: 'XXXXXXXXXXXXX', // API key
//   apiKeyMemo: '',          // API key notes
//   apiKeyName: '',          // API key name
//   createdAt: { nanos: 683000000, seconds: 1720359631 }, // API key creation time
//   scope: 'C',              // API key permissions
//   status: 1                // API key status
// }
```

### `fugle.getCertInfo()`

- Returns: {Promise} Fulfills with {CertInfo} upon success.

Gets the certificate information.

```js
fugle.getCertInfo().then(res => console.log(res));

// Prints:
// {
//   serial: '7DA4C168',             // certificate serial number
//   isValid: true,                  // certificate is valid
//   notAfter: 1676735999,           // certificate expiration time
//   cn: 'A123456789-00-00::PCC005'  // certificate name
// }
```

### `fugle.getMachineTime()`

- Returns: {Promise} Fulfills with {string} upon success.

Gets machine time of the remote server. If the time difference between the local time and the remote machine is too large, the verification process will fail.

```js
fugle.getMachineTime().then(res => console.log(res));

// Prints: 2022-03-10 10:23:48.464
```

### `fugle.streamer`

- {Streamer}

A class instance includes `EventEmitter` and `ws.WebSocket` to handle WebSocket connection.

### Event: `'connect'`

Emitted when the connection is established.

### Event: `'disconnect'`

Emitted when the connection is closed.

### Event: `'order'`

- `data` {string} The message content of the order confirmation. 

Emitted when an order is confirmed. The `data` is the message content of the order confirmation. 

### Event: `'trade'`

- `data` {string} The message content of the execution report.

Emitted when an order is executed. The `data` is the message content of the execution report. 

### Event: `'message'`

- `data` {string} The message content. 

Emitted when a message is received.

### Event: `'error'`

- `error` {Error}

Emitted when an error occurs. 

### `fugle.streamer.connect()`

Establish a connection to the remote server.

### `fugle.streamer.disconnect()`

Disconnect from the remote server.

## Class: `Order`

This class represents an order to be placed.

### Class property: `Order.Side`

- {enum}

| Key    | Value | Description |
| ------ | ----- | ----------- |
| `Buy`  | `'B'` | Buy side    |
| `Sell` | `'S'` | Sell side   |

### Class property: `Order.ApCode`

- {enum}

| Key           | Value | Description                    |
| ------------- | ----- | ------------------------------ |
| `Common`      | `'1'` | Regular trading                |
| `AfterMarket` | `'2'` | After-hour fixed-price trading |
| `Odd`         | `'3'` | After-hour odd Lot trading     |
| `Emg`         | `'4'` | Emerging stock trading         |
| `IntradayOdd` | `'5'` | Intraday odd lot trading       |

### Class property: `Order.PriceFlag`

- {enum}

| Key         | Value | Description      |
| ----------- | ----- | ---------------- |
| `Limit`     | `'0'` | Limit price      |
| `Flat`      | `'1'` | Reference price  |
| `LimitDown` | `'2'` | Limit down price |
| `LimitUp`   | `'3'` | Limit up price   |
| `Market`    | `'4'` | Market price     |

### Class property: `Order.BsFlag`

- {enum}

| Key   | Value | Description         |
| ----- | ----- | ------------------- |
| `ROD` | `'R'` | Rest of day         |
| `IOC` | `'I'` | Immediate or cancel |
| `FOK` | `'F'` | Fill or kill        |

### Class property: `Order.TradeType`

- {enum}

| Key              | Value | Description                   |
| ---------------- | ----- | ----------------------------- |
| `Cash`           | `'0'` | Cash trading                   |
| `Margin`         | `'3'` | Margin purchase / Margin sale |
| `Short`          | `'4'` | Short sale / Short covering   |
| `DayTrading`     | `'9'` | Day trading                   |
| `DayTradingSell` | `'A'` | Sell-and-then-buy day trading |

### Constructor: `new Order(payload)`

- `payload` {Object} Set payload of the order.
  - `stockNo` {string} The symbol of the equity.
  - `buySell` {Order.Side} The buy/sell side.
  - `price` {number} The price of the order.
  - `quantity` {number} The quantity of the order.
  - `apCode` {Order.ApCode} The trading system.
  - `priceFlag` {Order.PriceFlag} The price flag.
  - `bsFlag` {Order.BsFlag} The order type.
  - `trade` {Order.TradeType} The trade type.

Create a new `Order` instance.

### `order.payload`

- {Object}
  - `stockNo` {string} The symbol of the equity.
  - `buySell` {Order.Side} The buy/sell side.
  - `price` {number} The price of the order.
  - `quantity` {number} The quantity of the order.
  - `apCode` {Order.ApCode} The trading system.
  - `priceFlag` {Order.PriceFlag} The price flag.
  - `bsFlag` {Order.BsFlag} The order type.
  - `trade` {Order.TradeType} The trade type.

The payload of the order.

### `order.setSymbol(symbol)`

- `symbol` {string} The symbol of the equity.
- Returns: {this}

Sets `stockNo` value for the order payload.

### `order.setSide(side)`

- `side` {Order.Side} The buy/sell side.
- Returns: {this}

Sets `buySell` value for the order payload.

### `order.setPrice(price)`

- `price` {number} The price of the order.
- Returns: {this}

Sets `price` value for the order payload.

### `order.setQuantity(quantity)`

- `quantity` {number} The quantity of the order.
- Returns: {this}

Sets `quantity` value for the order payload.

### `order.setApCode(apCode)`

- `apCode` {Order.ApCode} The trading system.
- Returns: {this}

Sets `apCode` value for the order payload.

### `order.setPriceFlag(priceFlag)`

- `priceFlag` {Order.PriceFlag} The price flag.
- Returns: {this}

Sets `priceFlag` value for the order payload.

### `order.setBsFlag(bsFlag)`

- `bsFlag` {Order.BsFlag} The order type.
- Returns: {this}

Sets `bsFlag` value for the order payload.

### `order.setTradeType(tradeType)`

- `tradeType` {Order.TradeType} The trade type.
- Returns: {this}

Sets `trade` value for the order payload.

### `order.toObject()`

- Returns: {OrderObject}

Converts to `OrderObject` of the `@fugle/trade-core`.
