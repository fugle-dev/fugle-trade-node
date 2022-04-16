import { readFileSync } from 'fs';
import { Client } from '../src/client';
import { Streamer } from '../src/streamer';
import { Order } from '../src/order';
import { PlacedOrder } from '../src/placed-order';
import { readConfigFile } from '../src/utils';
import { ClientConfig, OrderResult } from '../src/interfaces';

jest.mock('@fugle/trade-core', () => {
  return {
    CoreSdk: function() {
      return {
        getWsUrl: () => 'ws://localhost:3000',
        getCertInfo: () => readFileSync('./test/fixtures/response-cert-info.txt').toString(),
        login: jest.fn(),
        order: () => readFileSync('./test/fixtures/response-place-order.txt').toString(),
        modifyVolume: () => readFileSync('./test/fixtures/response-replace-order.txt').toString(),
        modifyPrice: () => readFileSync('./test/fixtures/response-replace-order.txt').toString(),
        getOrderResults: () => readFileSync('./test/fixtures/response-orders.txt').toString(),
        getTransactions: () => readFileSync('./test/fixtures/response-transactions.txt').toString(),
        getInventories: () => readFileSync('./test/fixtures/response-inventories.txt').toString(),
        getMachineTime: () => readFileSync('./test/fixtures/response-machine-time.txt').toString(),
        getSettlements: () => readFileSync('./test/fixtures/response-settlements.txt').toString(),
        getKeyInfo: () => readFileSync('./test/fixtures/response-key-info.txt').toString(),
        getVolumePerUnit: () => 1000,
      };
    },
  };
});

jest.mock('keytar', () => {
  return {
    getPassword: () => Promise.resolve(null),
    setPassword: () => Promise.resolve(),
    deletePassword: () => Promise.resolve(true),
  };
});

jest.mock('inquirer', () => {
  return {
    prompt: () => Promise.resolve({ password: 'password', certPass: 'certPass' }),
  };
});

describe('Client', () => {
  const config = {
    ...readConfigFile('./test/fixtures/config.ini'),
    certPass: 'password',
  } as ClientConfig;

  describe('.streamer', () => {
    it('should get instance of streamer', async () => {
      const client = new Client(config);
      await client.login();
      expect(client.streamer).toBeInstanceOf(Streamer);
    });
  });

  describe('.login()', () => {
    it('should invoke sdk.login()', async () => {
      const client = new Client(config);
      const result = await client.login();
      expect(result).toBe(undefined);
      expect(client.sdk.login).toBeCalled();
    });
  });

  describe('.logout()', () => {
    it('should remove credentials', async () => {
      const client = new Client(config);
      const result = await client.logout();
      expect(result).toBe(undefined);
    });
  });

  describe('.placeOrder()', () => {
    it('should place order', async () => {
      const client = new Client(config);
      await client.login();
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
      const response = await client.placeOrder(order);
      const data = readFileSync('./test/fixtures/response-place-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });
  });

  describe('.replacePrice()', () => {
    it('should replace order to change price', async () => {
      const client = new Client(config);
      await client.login();
      const [ preorder, order ] = await client.getOrders();
      const response = await client.replacePrice(order, 140);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });

    it('should replace preorder to change price', async () => {
      const client = new Client(config);
      await client.login();
      const [ preorder, order ] = await client.getOrders();
      const response = await client.replacePrice(preorder, 140);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });
  });

  describe('.replaceQuantity()', () => {
    it('should replace order to change quantity', async () => {
      const client = new Client(config);
      await client.login();
      const [ preorder, order ] = await client.getOrders();
      const response = await client.replaceQuantity(order, 1);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });

    it('should replace preorder to change quantity', async () => {
      const client = new Client(config);
      await client.login();
      const [ preorder, order ] = await client.getOrders();
      const response = await client.replaceQuantity(preorder, 1);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });
  });

  describe('.cancelOrder()', () => {
    it('should cancel order', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [ order ] = await client.getOrders();
      await client.cancelOrder(order);
      expect(client.replaceQuantity).toBeCalledWith(order, 0);
    });
  });

  describe('.replaceOrder()', () => {
    it('should replace order to change price', async () => {
      const client = new Client(config);
      client.replacePrice = jest.fn();
      await client.login();
      const [ order ] = await client.getOrders();
      await client.replaceOrder(order, { price: 140 });
      expect(client.replacePrice).toBeCalledWith(order, 140);
    });

    it('should replace order to change quantity', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [ order ] = await client.getOrders();
      await client.replaceOrder(order, { quantity: 1 });
      expect(client.replaceQuantity).toBeCalledWith(order, 1);
    });

    it('should throw an error when price and quantity are not specified', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [ order ] = await client.getOrders();
      await expect(client.replaceOrder(order, {})).rejects.toThrow(TypeError);
    });

    it('should throw error when both price and quantity are specified', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [ order ] = await client.getOrders();
      await expect(client.replaceOrder(order, { price: 140, quantity: 1 })).rejects.toThrow(TypeError);
    });
  });

  describe('.getOrders()', () => {
    it('should get parsed order results', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getOrders();
      const data = readFileSync('./test/fixtures/response-orders-from-sdk.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data.orderResults.map((order: OrderResult) => new PlacedOrder(order)));
    });
  });

  describe('.getTransactions()', () => {
    it('should get parsed transactions', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getTransactions('3d');
      const data = readFileSync('./test/fixtures/response-transactions.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data.matSums);
    });
  });

  describe('.getInventories()', () => {
    it('should get parsed inventories', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getInventories();
      const data = readFileSync('./test/fixtures/response-inventories.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data.stkSums);
    });
  });

  describe('.getSettlements()', () => {
    it('should get parsed settlements', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getSettlements();
      const data = readFileSync('./test/fixtures/response-settlements.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data.settlements);
    });
  });

  describe('.getKeyInfo()', () => {
    it('should get parsed api key info', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getKeyInfo();
      const data = readFileSync('./test/fixtures/response-key-info.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });
  });

  describe('.getMachineTime()', () => {
    it('should get parsed machine time', async () => {
      const client = new Client(config);
      const response = await client.getMachineTime();
      const data = readFileSync('./test/fixtures/response-machine-time.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data.time);
    });
  });

  describe('.getCertInfo()', () => {
    it('should get parsed certificate info', async () => {
      const client = new Client(config);
      const response = await client.getCertInfo();
      const data = readFileSync('./test/fixtures/response-cert-info.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed);
    });
  });
});
