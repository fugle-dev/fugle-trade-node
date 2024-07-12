import { readFileSync } from 'fs';
import { Client } from '../src/client';
import { Streamer } from '../src/streamer';
import { Order } from '../src/order';
import { PlacedOrder } from '../src/placed-order';
import { readConfigFile } from '../src/utils';
import { ClientConfig } from '../src/interfaces';
import { PriceFlag } from '../src/enums';

jest.mock('@fugle/trade-core', () => {
  return {
    CoreSdk: function () {
      return {
        login: jest.fn(),
        order: () => readFileSync('./test/fixtures/response-place-order.txt').toString(),
        modifyVolume: () => readFileSync('./test/fixtures/response-replace-order.txt').toString(),
        modifyPrice: () => readFileSync('./test/fixtures/response-replace-order.txt').toString(),
        getOrderResults: () => readFileSync('./test/fixtures/response-orders-from-sdk.txt').toString(),
        getOrderResultHistory: () => readFileSync('./test/fixtures/response-order-history-from-sdk.txt').toString(),
        getTransactions: () => readFileSync('./test/fixtures/response-transactions.txt').toString(),
        getTransactionsByDate: () => readFileSync('./test/fixtures/response-transactions.txt').toString(),
        getInventories: () => readFileSync('./test/fixtures/response-inventories.txt').toString(),
        getSettlements: () => readFileSync('./test/fixtures/response-settlements.txt').toString(),
        getBalance: () => readFileSync('./test/fixtures/response-balance.txt').toString(),
        getTradeStatus: () => readFileSync('./test/fixtures/response-trade-status.txt').toString(),
        getMarketStatus: () => readFileSync('./test/fixtures/response-market-status.txt').toString(),
        getKeyInfo: () => readFileSync('./test/fixtures/response-key-info.txt').toString(),
        getCertInfo: () => readFileSync('./test/fixtures/response-cert-info.txt').toString(),
        getMachineTime: () => readFileSync('./test/fixtures/response-machine-time.txt').toString(),
        getWsUrl: () => 'ws://localhost:3000',
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
      const [order] = await client.getOrders();
      const response = await client.replacePrice(order, 140);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });

    it('should replace preorder to change price', async () => {
      const client = new Client(config);
      await client.login();
      const [preorder] = await client.getOrders();
      const response = await client.replacePrice(preorder, 140);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });

    it('should replace order to change price by limit price', async () => {
      const client = new Client(config);
      await client.login();
      client.sdk.modifyPrice = jest.fn(() => readFileSync('./test/fixtures/response-replace-order.txt').toString());
      const [order] = await client.getOrders();
      const response = await client.replacePrice(order, 140);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
      expect(client.sdk.modifyPrice).toBeCalledWith(order.toObject(), 140, PriceFlag.Limit)
    });

    it('should replace order to change price by price flag', async () => {
      const client = new Client(config);
      await client.login();
      client.sdk.modifyPrice = jest.fn(() => readFileSync('./test/fixtures/response-replace-order.txt').toString());
      const [order] = await client.getOrders();
      const response = await client.replacePrice(order, PriceFlag.Market);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
      expect(client.sdk.modifyPrice).toBeCalledWith(order.toObject(), null, PriceFlag.Market)
    });
  });

  describe('.replaceQuantity()', () => {
    it('should replace order to change quantity', async () => {
      const client = new Client(config);
      await client.login();
      const [order] = await client.getOrders();
      const response = await client.replaceQuantity(order, 1);
      const data = readFileSync('./test/fixtures/response-replace-order.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data);
    });

    it('should replace preorder to change quantity', async () => {
      const client = new Client(config);
      await client.login();
      const [preorder] = await client.getOrders();
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
      const [order] = await client.getOrders();
      await client.cancelOrder(order);
      expect(client.replaceQuantity).toBeCalledWith(order, 0);
    });
  });

  describe('.replaceOrder()', () => {
    it('should replace order to change price', async () => {
      const client = new Client(config);
      client.replacePrice = jest.fn();
      await client.login();
      const [order] = await client.getOrders();
      await client.replaceOrder(order, { price: 140 });
      expect(client.replacePrice).toBeCalledWith(order, 140);
    });

    it('should replace order to change quantity', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [order] = await client.getOrders();
      await client.replaceOrder(order, { quantity: 1 });
      expect(client.replaceQuantity).toBeCalledWith(order, 1);
    });

    it('should throw an error when price and quantity are not specified', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [order] = await client.getOrders();
      await expect(client.replaceOrder(order, {})).rejects.toThrow(TypeError);
    });

    it('should throw error when both price and quantity are specified', async () => {
      const client = new Client(config);
      client.replaceQuantity = jest.fn();
      await client.login();
      const [order] = await client.getOrders();
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
      expect(response).toEqual(parsed.data.orderResults.map((order: Record<string, string>) => new PlacedOrder(order)));
    });
  });

  describe('.getHistoryOrders()', () => {
    it('should get parsed order results', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getHistoricalOrders({ startDate: '2023-01-01', endDate: '2023-01-31' });
      const data = readFileSync('./test/fixtures/response-order-history-from-sdk.txt').toString();
      const parsed = JSON.parse(data);
      expect(response).toEqual(parsed.data.orderResultHistory.map((order: Record<string, string>) => new PlacedOrder(order)));
    });
  });

  describe('.getTransactions()', () => {
    it('should throw error when startDate and endDate options are given but duration is specified', async () => {
      const client = new Client(config);
      await client.login();
      await expect(client.getTransactions({ duration: '3d', startDate: '2023-01-01', endDate: '2023-02-28' })).rejects.toThrow(TypeError);
    });

    it('should throw error when startDate is specified but endDate is missing', async () => {
      const client = new Client(config);
      await client.login();
      await expect(client.getTransactions({ startDate: '2023-01-01' })).rejects.toThrow(TypeError);
    });

    it('should throw error when endDate is specified but startDate is missing', async () => {
      const client = new Client(config);
      await client.login();
      await expect(client.getTransactions({ endDate: '2023-02-28' })).rejects.toThrow(TypeError);
    });

    it('should get parsed transactions by duration', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getTransactions({ duration: '3d' });
      const data = readFileSync('./test/fixtures/response-transactions.txt').toString();
      const parsed = JSON.parse(data);
      const actual = renameMemoToUserDef(parsed);
      expect(response).toEqual(actual.data.matSums);
    });

    function renameMemoToUserDef(data: { data: { matSums: any[]; }; }) {
      data.data.matSums.forEach(trade => {
        trade.matDats.forEach((tradeDate: { userDef: any; memo: any; }) => {
          tradeDate.userDef = tradeDate.memo;
          delete tradeDate.memo;
        });
      });
      return data;
    }

    it('should get parsed transactions by startDate and endDate options', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getTransactions({ startDate: '2023-01-01', endDate: '2023-02-28' });
      const data = readFileSync('./test/fixtures/response-transactions.txt').toString();
      const parsed = JSON.parse(data);
      const actual = renameMemoToUserDef(parsed);
      expect(response).toEqual(actual.data.matSums);
    });
  });

  describe('.getInventories()', () => {
    it('should get parsed inventories', async () => {
      const client = new Client(config);
      await client.login();
      const response = await client.getInventories();
      const data = readFileSync('./test/fixtures/response-inventories.txt').toString();
      const parsed = JSON.parse(data);
      parsed.data.stkSums.forEach((stk: { stkDats: any[]; }) => {
        stk.stkDats.forEach((dat: { userDef: any; memo: any; }) => {
          dat.userDef = dat.memo;
          delete dat.memo;
        });
      });
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

  describe('.getBalance()', () => {
    it('should get parsed certificate info', async () => {
      const client = new Client(config);
      const response = await client.getBalance();
      const data = readFileSync('./test/fixtures/response-balance.txt').toString();
      const parsed = JSON.parse(data).data;
      expect(response).toEqual(parsed);
    });
  });

  describe('.getMarketStatus()', () => {
    it('should get parsed certificate info', async () => {
      const client = new Client(config);
      const response = await client.getMarketStatus();
      const data = readFileSync('./test/fixtures/response-market-status.txt').toString();
      const parsed = JSON.parse(data).data;
      expect(response).toEqual(parsed);
    });
  });

  describe('.getTradeStatus()', () => {
    it('should get parsed certificate info', async () => {
      const client = new Client(config);
      const response = await client.getTradeStatus();
      const data = readFileSync('./test/fixtures/response-trade-status.txt').toString();
      const parsed = JSON.parse(data).data;
      expect(response).toEqual(parsed);
    });
  });
});
