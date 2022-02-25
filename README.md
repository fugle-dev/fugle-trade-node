# Fugle Trade

[![NPM version][npm-image]][npm-url]
[![Build Status][action-image]][action-url]
[![Coverage Status][codecov-image]][codecov-url]

> Fugle Trade SDK for Node.js

## Install

```sh
$ npm install --save @fugle/trade
```

## Getting Started

```js
import { FugleTrade } from '@fugle/trade';

const fugle = new FugleTrade({
  configPath: '/path/to/config.ini',
  certPass: 'YOUR_CERTIFICATE_PASSWORD',
});

fugle.login('YOUR_ACCOUNT', 'YOUR_PASSWORD').then(() => {
  fugle.streamer.connect();

  fugle.streamer.on('connect', () => {
    console.log('streamer connected');

    // place order
    fugle.placeOrder({
        buySell: 'B',
        price: '28.00',
        stockNo: '2884',
        quantity: '1',
        apCode: '1',
        priceFlag: '0',
        bsFlag: 'R',
        trade: '0',
    });
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

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fugle/trade.svg
[npm-url]: https://npmjs.com/package/@fugle/trade
[action-image]: https://img.shields.io/github/workflow/status/fugle-dev/fugle-trade-node/Node.js%20CI
[action-url]: https://github.com/fugle-dev/fugle-trade-node/actions/workflows/node.js.yml
[codecov-image]: https://img.shields.io/codecov/c/github/fugle-dev/fugle-trade-node.svg
[codecov-url]: https://codecov.io/gh/fugle-dev/fugle-trade-node
