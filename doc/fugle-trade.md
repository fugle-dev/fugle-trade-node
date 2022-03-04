# @fugle/trade

## Table of Contents

- [Class: FugleTrade](#class-fugletrade)
  - [Constructor: new FugleTrade(options)](#constructor-new-fugletradeoptions)
  - [fugle.login(account, password)](#fugleloginaccount-password)
  - [fugle.placeOrder(order)](#fugleplaceorderorder)
  - [fugle.replacePrice(order, price)](#fuglereplacepriceorder-price)
  - [fugle.replaceQuantity(order, quantity)](#fuglereplacequantityorder-quantity)
  - [fugle.cancelOrder(order)](#fuglecancelorderorder)
  - [fugle.getOrders()](#fuglegetorders)
  - [fugle.getTransactions(range)](#fuglegettransactionsrange)
  - [fugle.getInventories()](#fuglegetinventories)
  - [fugle.getSettlements()](#fuglegetsettlements)
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
  - [Class property: Order.Trade](#class-property-ordertrade)
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
    - `apiUrl` {string} The Fugle Trade API URL.
    - `apiKey` {string} The Fugle Trade API key.
    - `apiSecret` {string} The Fugle Trade API secret.
    - `certPath` {string} The path of certificate.
    - `aid` {string} The account ID.
  - `certPass` {string} The certificate password.

Create a new `FugleTrade` instance.

### `fugle.login(account, password)`

- `account` {string} The acount ID of the user.
- `password` {string} The password of the user.
- Returns: {Promise} Fulfills with `undefined` upon success.

Log in to the remote server to begin using services.

### `fugle.placeOrder(order)`

- `order` {Order} The order to be placed.
- Returns: {Promise} Fulfills with an {PlaceOrderResponse} upon success.

Place an order for the logged account.

### `fugle.replacePrice(order, price)`

- `order` {OrderResult} The working order to be replaced.
- `price` {number} The price of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order to change price for the logged account.

### `fugle.replaceQuantity(order, quantity)`

- `order` {OrderResult} The working order to be replaced.
- `quantity` {number} The price of quantity.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order to change quantity for the logged account.

### `fugle.replaceOrder(order, options)`

- `order` {OrderResult} The working order to be replaced.
- `options` {Object} Set of configurable options to replace the order.
  - `price` {number} The price of price.
  - `quantity` {number} The price of quantity.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order for the logged account. Note that one and only one of the `price` or `quantity` options must be specified.

### `fugle.cancelOrder(order)`

- `order` {OrderResult} The working order to be canceled.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Cancel the order for the logged account.

### `fugle.getOrders()`

- Returns: {Promise} Fulfills with {OrderResult[]} upon success.

Gets existing orders of the logged account.

### `fugle.getTransactions(range)`

- `range` {string} Available range is `0d`, `3d`, `1m` or `3m`. 
- Returns: {Promise} Fulfills with {Trade[]} upon success.

Gets transactions of the logged account.

### `fugle.getInventories()`

- Returns: {Promise} Fulfills with {Stock[]} upon success.

Gets inventories of the logged account.

### `fugle.getSettlements()`

- Returns: {Promise} Fulfills with {Settlement[]} upon success.

Gets incoming settlements of the logged account.

### `fugle.getKeyInfo()`

- Returns: {Promise} Fulfills with an {KeyInfo} upon success.

Gets API key information of the logged account.

### `fugle.getMachineTime()`

- Returns: {Promise} Fulfills with {string} upon success.

Gets machine time of the remote server. If the time difference between the local time and the remote machine is too large, the verification process will fail.

### `fugle.getCertInfo()`

- Returns: {Promise} Fulfills with {CertInfo} upon success.

Gets the certificate information.

### `fugle.streamer`

- {Streamer}

A class instance includes `EventEmitter` and `ws.WebSocket` to handle WebSocket connection.

### Event: `'connect'`

Emitted when the connection is established.

### Event: `'disconnect'`

Emitted when the connection is closed.

### Event: `'order'`

- `data` {string} The message content of the order confirmation. 

Emitted when an order is confirmed.

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

### Class property: `Order.Trade`

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
  - `buySell` {Order.Side}
  - `price` {number}
  - `quantity` {number}
  - `apCode` {Order.ApCode}
  - `priceFlag` {Order.PriceFlag}
  - `bsFlag` {Order.BsFlag}
  - `trade` {Order.Trade}

Create a new `Order` instance.

### `order.payload`

- {Object}
  - `buySell` {Order.Side}
  - `price` {number}
  - `quantity` {number}
  - `apCode` {Order.ApCode}
  - `priceFlag` {Order.PriceFlag}
  - `bsFlag` {Order.BsFlag}
  - `trade` {Order.Trade}

The payload of the order.

### `order.setSymbol(symbol)`

- `symbol` {string}
- Returns: {this}

Sets `stockNo` value for the order payload.

### `order.setSide(side)`

- `side` {Order.Side}
- Returns: {this}

Sets `buySell` value for the order payload.

### `order.setPrice(price)`

- `side` {number}
- Returns: {this}

Sets `price` value for the order payload.

### `order.setQuantity(quantity)`

- `quantity` {number}
- Returns: {this}

Sets `quantity` value for the order payload.

### `order.setApCode(apCode)`

- `apCode` {Order.ApCode}
- Returns: {this}

Sets `apCode` value for the order payload.

### `order.setPriceFlag(priceFlag)`

- `apCode` {Order.PriceFlag}
- Returns: {this}

Sets `priceFlag` value for the order payload.

### `order.setBsFlag(bsFlag)`

- `bsFlag` {Order.BsFlag}
- Returns: {this}

Sets `bsFlag` value for the order payload.

### `order.setTrade(trade)`

- `trade` {Order.Trade}
- Returns: {this}

Sets `trade` value for the order payload.

### `order.toObject()`

- Returns: {OrderObject}

Converts to `OrderObject` of the `@fugle/trade-core`.
