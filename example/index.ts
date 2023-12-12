import { FugleTrade, Order } from '../src';

const fugle = new FugleTrade({ configPath: './config.sit.ini' });
fugle.logout();
fugle.login().then(() => {
  // fugle.streamer.connect();

  // fugle.streamer.on('connect', () => {
  //   console.log('streamer connected');

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
  // fugle.placeOrder(order)
  //   .then(x => console.log(x));

  // fugle.streamer.on('disconnect', () => {
  //   console.log('streamer disconnected');
  // });

  // fugle.streamer.on('order', (data) => {
  //   console.log('order confirmation:');
  //   console.log(data);
  // });

  // fugle.streamer.on('trade', (data) => {
  //   console.log('execution report:');
  //   console.log(data);
  // });
  //get order result
  // fugle.getOrders().then(console.log);
  //get order by date
  // fugle.getHistoryOrders({ startDate: "2023-06-01", endDate: "2023-06-30" })
  //   .then(console.log);
});
