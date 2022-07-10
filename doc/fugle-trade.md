# @fugle/trade

## Table of Contents

- [Class: FugleTrade](#class-fugletrade)
  - [Constructor: new FugleTrade(options)](#constructor-new-fugletradeoptions)
  - [fugle.login()](#fuglelogin)
  - [fugle.logout()](#fuglelogout)
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

### `fugle.logout()`

- Returns: {Promise} Fulfills with `undefined` upon success.

Log out and remove the credentials of the logged in account.

### `fugle.placeOrder(order)`

- `order` {Order} The order to be placed.
- Returns: {Promise} Fulfills with an {PlaceOrderResponse} upon success.

Place an order for the logged in account.

### `fugle.replacePrice(order, price)`

- `order` {PlacedOrder} The working order to be replaced.
- `price` {number} The price of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order to change price for the logged in account.

### `fugle.replaceQuantity(order, quantity)`

- `order` {PlacedOrder} The working order to be replaced.
- `quantity` {number} The price of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order to change quantity for the logged in account.

### `fugle.replaceOrder(order, options)`

- `order` {PlacedOrder} The working order to be replaced.
- `options` {Object} Set of configurable options to replace the order.
  - `price` {number} The price of replace.
  - `quantity` {number} The quantity of replace.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Replace the order for the logged in account. Note that one and only one of the `price` or `quantity` options must be specified.

### `fugle.cancelOrder(order)`

- `order` {PlacedOrder} The working order to be canceled.
- Returns: {Promise} Fulfills with an {ReplaceOrderResponse} upon success.

Cancel the order for the logged in account.

### `fugle.getOrders()`

- Returns: {Promise} Fulfills with {PlacedOrder[]} upon success.

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
