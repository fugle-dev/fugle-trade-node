import { CoreSdk } from '@fugle/trade-core';
import { Streamer } from './streamer';
import { Order } from './order';
import { PlacedOrder } from './placed-order';
import { loadCredentials, removeCredentials } from './utils';
import { ClientConfig } from './interfaces/client-config.interface';
import { ParsedCertInfo, CertInfo } from './interfaces/parsed-cert-info-interface';
import { ParsedInventories, Stock } from './interfaces/parsed-inventories.interface';
import { ParsedKeyInfo, KeyInfo } from './interfaces/parsed-key-info-interface';
import { ParsedMachineTime } from './interfaces/parsed-machine-time.interface';
import { ParsedOrderResult } from './interfaces/parsed-order-result.interface';
import { ParsedSettlements, Settlement } from './interfaces/parsed-settlements.interface';
import { ParsedTransactions, Trade } from './interfaces/parsed-transactions.interface';
import { ParsedPlaceOrderResponse, PlaceOrderResponse } from './interfaces/parsed-place-order-response.interface';
import { ParsedReplaceOrderResponse, ReplaceOrderResponse } from './interfaces/parsed-replace-order-response.interface';

type Range = '0d' | '3d' | '1m' | '3m';

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
    const response = this.sdk.order(order.toObject());
    const parsed = JSON.parse(response) as ParsedPlaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async replacePrice(placedOrder: PlacedOrder, price: number): Promise<ReplaceOrderResponse> {
    const order = placedOrder.toObject();
    const response = this.sdk.modifyPrice(order, price)
    const parsed = JSON.parse(response) as ParsedReplaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async replaceQuantity(placedOrder: PlacedOrder, quantity: number): Promise<ReplaceOrderResponse> {
    const order = placedOrder.toObject();
    const response = this.sdk.modifyVolume(order, quantity);
    const parsed = JSON.parse(response) as ParsedReplaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async cancelOrder(placedOrder: PlacedOrder): Promise<ReplaceOrderResponse> {
    return this.replaceQuantity(placedOrder, 0);
  }

  // Must login first
  async replaceOrder(placedOrder: PlacedOrder, options: { price?: number, quantity?: number }): Promise<ReplaceOrderResponse> {
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
    return parsed.data.orderResults
      .map(order => {
        const { apCode, stockNo } = order;
        const unit = this.sdk.getVolumePerUnit(stockNo);
        const result = { ...order };
        if(apCode === '4' || apCode === '5') {
          result.orgQtyShare = result.orgQty;
          result.matQtyShare = result.matQty;
          result.celQtyShare = result.celQty;
          result.orgQty = (Number(result.orgQty) / unit).toString();
          result.matQty = (Number(result.matQty) / unit).toString();
          result.celQty = (Number(result.celQty) / unit).toString();
        } else {
          result.orgQtyShare = (Number(result.orgQty) * unit).toString();
          result.matQtyShare = (Number(result.matQty) * unit).toString();
          result.celQtyShare = (Number(result.celQty) * unit).toString();
        }
        return result;
      })
      .map(order => new PlacedOrder(order));
  }

  // Must login first
  async getTransactions(range: Range): Promise<Trade[]> {
    const response = this.sdk.getTransactions(range);
    const parsed = JSON.parse(response) as ParsedTransactions;
    return parsed.data.matSums;
  }

  // Must login first
  async getInventories(): Promise<Stock[]> {
    const response = this.sdk.getInventories();
    const parsed = JSON.parse(response) as ParsedInventories;
    return parsed.data.stkSums;
  }

  // Must login first
  async getSettlements(): Promise<Settlement[]> {
    const response = this.sdk.getSettlements();
    const parsed = JSON.parse(response) as ParsedSettlements;
    return parsed.data.settlements;
  }

  // Must login first
  async getKeyInfo(): Promise<KeyInfo> {
    const response = this.sdk.getKeyInfo();
    const parsed = JSON.parse(response) as ParsedKeyInfo;
    return parsed.data;
  }

  async getMachineTime(): Promise<string> {
    const response = this.sdk.getMachineTime();
    const parsed = JSON.parse(response) as ParsedMachineTime;
    return parsed.data.time;
  }

  async getCertInfo(): Promise<CertInfo> {
    const response = this.sdk.getCertInfo();
    const parsed = JSON.parse(response) as ParsedCertInfo;
    return parsed;
  }
}
