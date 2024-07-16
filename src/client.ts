import { CoreSdk } from '@fugle/trade-core';
import { Streamer } from './streamer';
import { Order } from './order';
import { PlacedOrder } from './placed-order';
import { PriceFlag, Market } from './enums';
import { loadCredentials, removeCredentials } from './utils';
import { ClientConfig } from './interfaces/client-config.interface';
import { ParsedCertInfo, CertInfo } from './interfaces/parsed-cert-info-interface';
import { ParsedInventories, renameInventoriesMemoToUserDef, Stock } from './interfaces/parsed-inventories.interface';
import { ParsedKeyInfo, KeyInfo } from './interfaces/parsed-key-info-interface';
import { ParsedMachineTime } from './interfaces/parsed-machine-time.interface';
import { ParsedOrderResult } from './interfaces/parsed-order-result.interface';
import { ParsedSettlements, Settlement } from './interfaces/parsed-settlements.interface';
import { ParsedBalanceStatus, BalanceStatus } from './interfaces/parsed-balance.interface';
import { ParsedTradeStatus, TradeStatus } from './interfaces/parsed-trade-status.interface';
import { ParsedMarketStatus, MarketStatus } from './interfaces/parsed-market-status.interface';
import { ParsedTransactions, renameTransactionsMemoToUserDef, Trade } from './interfaces/parsed-transactions.interface';
import { ParsedPlaceOrderResponse, PlaceOrderResponse } from './interfaces/parsed-place-order-response.interface';
import { ParsedReplaceOrderResponse, ReplaceOrderResponse } from './interfaces/parsed-replace-order-response.interface';
import { ParsedOrderResultHistory } from './interfaces/parsed-order-result-history.interface';

type Duration = '0d' | '3d' | '1m' | '3m';

const SDK = Symbol('Client#sdk');
const STREAMER = Symbol('Client#streamer');

export class Client {
  private [SDK]!: CoreSdk;
  private [STREAMER]!: Streamer;

  constructor(private readonly config: ClientConfig) {
    const { apiUrl, apiKey, apiSecret, certPath, certPass, aid, password } = config;
    if (certPass && password) {
      this[SDK] = new CoreSdk(apiUrl, aid, certPath, certPass, apiKey, apiSecret);
    }
  }

  get sdk(): CoreSdk {
    return this[SDK];
  }

  set sdk(sdk: CoreSdk) {
    this[SDK] = sdk;
  }

  get streamer(): Streamer {
    return this[STREAMER];
  }

  set streamer(streamer: Streamer) {
    this[STREAMER] = streamer;
  }

  async login(): Promise<void> {
    if (!this.sdk) {
      const { password, certPass } = await loadCredentials(this.config.aid);
      const { apiUrl, apiKey, apiSecret, certPath, aid } = this.config;
      this.sdk = new CoreSdk(apiUrl, aid, certPath, certPass, apiKey, apiSecret);
      this.config.password = password;
    }
    this.sdk.login(this.config.aid, this.config.password);
    this.streamer = new Streamer(this.sdk.getWsUrl());
  }

  async logout(): Promise<void> {
    await removeCredentials(this.config.aid);
  }

  // Must login first
  async placeOrder(order: Order): Promise<PlaceOrderResponse> {
    const response = this.sdk.order(order.toObject(), order.payload.userDef || '');
    const parsed = JSON.parse(response) as ParsedPlaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async replacePrice(placedOrder: PlacedOrder, price: number | PriceFlag): Promise<ReplaceOrderResponse> {
    const unit = this.sdk.getVolumePerUnit(placedOrder.payload.stockNo as string);
    const order = placedOrder.toObject({ unit });
    const response = (typeof price === 'number')
      ? this.sdk.modifyPrice(order, price, PriceFlag.Limit)
      : this.sdk.modifyPrice(order, null, price);
    const parsed = JSON.parse(response) as ParsedReplaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async replaceQuantity(placedOrder: PlacedOrder, quantity: number): Promise<ReplaceOrderResponse> {
    const unit = this.sdk.getVolumePerUnit(placedOrder.payload.stockNo as string);
    const order = placedOrder.toObject({ unit });
    const response = this.sdk.modifyVolume(order, quantity);
    const parsed = JSON.parse(response) as ParsedReplaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async cancelOrder(placedOrder: PlacedOrder): Promise<ReplaceOrderResponse> {
    return this.replaceQuantity(placedOrder, 0);
  }

  // Must login first
  async replaceOrder(placedOrder: PlacedOrder, options: { price?: number | PriceFlag, quantity?: number }): Promise<ReplaceOrderResponse> {
    if (!!(options && options.price) !== !!(options && options.quantity)) {
      /* istanbul ignore else */
      if (options.price) return this.replacePrice(placedOrder, options.price);
      /* istanbul ignore else */
      if (options.quantity) return this.replaceQuantity(placedOrder, options.quantity);
    }
    throw new TypeError('One and only one of the "price" or "quantity" options must be specified');
  }

  // Must login first
  async getOrders(): Promise<PlacedOrder[]> {
    const response = this.sdk.getOrderResults();
    const parsed = JSON.parse(response) as ParsedOrderResult;
    return parsed.data.orderResults.map(order => new PlacedOrder({ ...order }));
  }

  async getHistoricalOrders(options: { startDate: string, endDate: string }): Promise<PlacedOrder[]> {
    const market: Market = Market.All;
    const { startDate, endDate } = options;
    const response = this.sdk.getOrderResultHistory(startDate, endDate, market);
    const parsed = JSON.parse(response) as ParsedOrderResultHistory;
    return parsed.data.orderResultHistory.map(order => new PlacedOrder({ ...order }));
  }

  // Must login first
  async getTransactions(options: { duration?: Duration, startDate?: string, endDate?: string }): Promise<Trade[]> {
    const { duration, startDate, endDate } = options;
    if (duration && (startDate || endDate)) {
      throw new TypeError('Cannot give "startDate" and "endDate" options when "duration" is specified');
    }
    if (!duration && (!startDate || !endDate)) {
      throw new TypeError('Both "startDate" and "endDate" options should be given if "duration" is not specified');
    }
    const response = duration
      ? this.sdk.getTransactions(duration)
      : this.sdk.getTransactionsByDate(startDate as string, endDate as string);
    // const parsed = JSON.parse(response) as ParsedTransactions;
    const parsed = renameTransactionsMemoToUserDef(JSON.parse(response) as ParsedTransactions);
    return parsed.data.matSums;
  }

  // Must login first
  async getInventories(): Promise<Stock[]> {
    const response = this.sdk.getInventories();
    const parsed = renameInventoriesMemoToUserDef(JSON.parse(response) as ParsedInventories);
    return parsed.data.stkSums;
  }

  // Must login first
  async getSettlements(): Promise<Settlement[]> {
    const response = this.sdk.getSettlements();
    const parsed = JSON.parse(response) as ParsedSettlements;
    return parsed.data.settlements;
  }

  // Must login first
  async getBalance(): Promise<BalanceStatus> {
    const response = this.sdk.getBalance();
    const parsed = JSON.parse(response) as ParsedBalanceStatus;
    return parsed.data;
  }

  // Must login first
  async getTradeStatus(): Promise<TradeStatus> {
    const response = this.sdk.getTradeStatus();
    const parsed = JSON.parse(response) as ParsedTradeStatus;
    return parsed.data;
  }

  // Must login first
  async getMarketStatus(): Promise<MarketStatus> {
    const response = this.sdk.getMarketStatus();
    const parsed = JSON.parse(response) as ParsedMarketStatus;
    return parsed.data;
  }

  // Must login first
  async getKeyInfo(): Promise<KeyInfo> {
    const response = this.sdk.getKeyInfo();
    const parsed = JSON.parse(response) as ParsedKeyInfo;
    return parsed.data;
  }

  async getCertInfo(): Promise<CertInfo> {
    const response = this.sdk.getCertInfo();
    const parsed = JSON.parse(response) as ParsedCertInfo;
    return parsed;
  }

  async getMachineTime(): Promise<string> {
    const response = this.sdk.getMachineTime();
    const parsed = JSON.parse(response) as ParsedMachineTime;
    return parsed.data.time;
  }
}
