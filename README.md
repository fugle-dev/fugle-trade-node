# Fugle Trade

[![NPM version][npm-image]][npm-url]
[![Build Status][action-image]][action-url]
[![Coverage Status][codecov-image]][codecov-url]

> FugleTrade API SDK for Node.js

## Installation

```sh
$ npm install --save @fugle/trade
```

## Importing

```js
// Using Node.js `require()`
const { FugleTrade, Order } = require('@fugle/trade');

// Using ES6 imports
import { FugleTrade, Order } from '@fugle/trade';
```

## Quick Start

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

    // place order
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

## Usage

Make sure you have applied to use Fugle trading API, downloaded the configuration file and certificate to your local machine.

### Creating a client

First, create a `FugleTrade` client with `configPath` option:

```js
const fugle = new FugleTrade({ configPath: '/path/to/config.ini' });
```

### Logining to server

After creating the client, you need to log in to the remote server to obtain a valid api token:


```js
await fugle.login();
```

When you log in for the first time, you need to set your account password and certificate password:

```sh
? Enter esun account password ********
? Enter cert password ********
```

Once logged in, you can start placing orders and viewing account information:

```js
// Retrieve existing orders
const orders = await fugle.getOrders();

// Retrieve transaction details within three months
const transactions = await fugle.getTransactions({ duration: '3m' });

// Retrieve all inventories in your account
const inventories = await fugle.getInventories();

// Retrieve incoming settlements
const settlements = await fugle.getSettlements();

// Retrieve bank account balance
const balance = await fugle.getBalance();

// Retrieve trading quota and margin transaction information
const tradeStatus = await fugle.getTradeStatus();

// Retrieve market open status
const marketStatus = await fugle.getMarketStatus();
```

When you want to log in with another account, or need to reset your certificate password, please log out first:

```js
await fugle.logout();
```

### Placing an order

In order to place an order, you need to import `Order` from `@fugle/trade`.

```js
import { Order } from '@fugle/trade';
```

Then, create an `Order` instance that represents the order to place:

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

// place the order
await fugle.placeOrder(order);
```

See [`/doc/fugle-trade.md`](./doc/fugle-trade.md#class-order) for details on available options.

### Replacing or canceling the order

If you want to replace or cancel an order, you need to get your all existing orders first.

```js
const orders = await fugle.getOrders();
```

After that, you can choose one of the orders to replace or cancel it.

```js
const [ order, ...others ] = orders;

// Replace the order to change price
await fugle.replacePrice(order, 24.5);

// Replace the order to change quantity
await fugle.replaceQuantity(order, 1);

// Cancel the order
await fugle.cancelOrder(order);
```

### Connecting to streamer

Streamer is an application that serves streaming data to clients of Fugle. If you want to receive order confirmation or execution report in real time, you need to connect the streamer.

Make sure you are logged in, then connect to the streamer:

```js
fugle.streamer.connect();
```

The `fugle.streamer` inherits from `EventEmitter` that lets you register event listeners to listen for events:

```js
fugle.streamer.on('connect', () => {
  // streamer connected
});

fugle.streamer.on('disconnect', () => {
  // streamer disconnected
});

fugle.streamer.on('order', (data) => {
  // receive order confirmation
});

fugle.streamer.on('trade', (data) => {
  // receive execution report
});

fugle.streamer.on('message', (data) => {
  // receive message from streamer
});

fugle.streamer.on('error', (err) => {
  // handle error
});
```

If you want to disconnect the streamer, just inovke:

```js
fugle.streamer.disconnect();
```

## Documentation

See [`/doc/fugle-trade.md`](./doc/fugle-trade.md) for Node.js-like documentation of `@fugle/trade` classes.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fugle/trade.svg
[npm-url]: https://npmjs.com/package/@fugle/trade
[action-image]: https://img.shields.io/github/actions/workflow/status/fugle-dev/fugle-trade-node/node.js.yml?branch=master
[action-url]: https://github.com/fugle-dev/fugle-trade-node/actions/workflows/node.js.yml
[codecov-image]: https://img.shields.io/codecov/c/github/fugle-dev/fugle-trade-node.svg
[codecov-url]: https://codecov.io/gh/fugle-dev/fugle-trade-node
