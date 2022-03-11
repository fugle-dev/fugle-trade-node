import { Order } from '../src';

describe('Order', () => {
  describe('#constructor()', () => {
    it('should create Order instance', () => {
      const order = new Order();
      expect(order).toBeInstanceOf(Order);
      expect(order.payload).toEqual({});
    });

    it('should create Order instance with payload', () => {
      const payload = {
        buySell: Order.Side.Buy,
        price: 25.00,
        stockNo: '2884',
        quantity: 1,
        apCode: Order.ApCode.Common,
        priceFlag: Order.PriceFlag.Limit,
        bsFlag: Order.BsFlag.ROD,
        trade: Order.Trade.Cash,
      };
      const order = new Order(payload);
      expect(order).toBeInstanceOf(Order);
      expect(order.payload).toEqual(payload);
    });
  });

  describe('.setSymbol()', () => {
    it('should set stockNo of the payload', () => {
      const order = new Order();
      const symbol = '2884';
      order.setSymbol(symbol);
      expect(order.payload.stockNo).toBe(symbol);
    });
  });

  describe('.setSide()', () => {
    it('should set buySell of the payload', () => {
      const order = new Order();
      const side = Order.Side.Buy;
      order.setSide(side);
      expect(order.payload.buySell).toBe(side);
    });
  });

  describe('.setPrice()', () => {
    it('should set price of the payload', () => {
      const order = new Order();
      const price = 25.00;
      order.setPrice(price);
      expect(order.payload.price).toBe(price);
    });
  });

  describe('.setQuantity()', () => {
    it('should set quantity of the payload', () => {
      const order = new Order();
      const quantity = 1;
      order.setQuantity(quantity);
      expect(order.payload.quantity).toBe(quantity);
    });
  });

  describe('.setApCode()', () => {
    it('should set apCode of the payload', () => {
      const order = new Order();
      const apCode = Order.ApCode.Common;
      order.setApCode(apCode);
      expect(order.payload.apCode).toBe(apCode);
    });
  });

  describe('.setPriceFlag()', () => {
    it('should set priceFlag of the payload', () => {
      const order = new Order();
      const priceFlag = Order.PriceFlag.Limit;
      order.setPriceFlag(priceFlag);
      expect(order.payload.priceFlag).toBe(priceFlag);
    });
  });

  describe('.setBsFlag()', () => {
    it('should set bsFlag of the payload', () => {
      const order = new Order();
      const bsFlag = Order.BsFlag.ROD;
      order.setBsFlag(bsFlag);
      expect(order.payload.bsFlag).toBe(bsFlag);
    });
  });

  describe('.setTradeType()', () => {
    it('should set trade of the payload', () => {
      const order = new Order();
      const trade = Order.Trade.Cash;
      order.setTradeType(trade);
      expect(order.payload.trade).toBe(trade);
    });
  });

  describe('.toObject()', () => {
    it('should return OrderObject', () => {
      const order = new Order()
        .setSymbol('2884')
        .setSide(Order.Side.Buy)
        .setPrice(25.00)
        .setQuantity(1)
        .setApCode(Order.ApCode.Common)
        .setPriceFlag(Order.PriceFlag.Limit)
        .setBsFlag(Order.BsFlag.ROD)
        .setTradeType(Order.Trade.Cash)

      expect(order.payload).toEqual({
        buySell: Order.Side.Buy,
        price: 25.00,
        stockNo: '2884',
        quantity: 1,
        apCode: Order.ApCode.Common,
        priceFlag: Order.PriceFlag.Limit,
        bsFlag: Order.BsFlag.ROD,
        trade: Order.Trade.Cash,
      });

      expect(order.toObject()).toEqual({
        buySell: 'B',
        price: '25',
        stockNo: '2884',
        quantity: '1',
        apCode: '1',
        priceFlag: '0',
        bsFlag: 'R',
        trade: '0',
      });
    });
  });
});
