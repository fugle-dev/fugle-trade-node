import { CoreSdk, OrderObject, OrderResultObject } from '@fugle/trade-core';
import { Streamer } from './streamer';
import { Order } from './order';
import { ClientConfig } from './interfaces/client-config.interface';
import { ParsedCertInfo, CertInfo } from './interfaces/parsed-cert-info-interface';
import { ParsedInventories, Stock } from './interfaces/parsed-inventories.interface';
import { ParsedKeyInfo, KeyInfo } from './interfaces/parsed-key-info-interface';
import { ParsedMachineTime } from './interfaces/parsed-machine-time.interface';
import { ParsedOrderResult, OrderResult } from './interfaces/parsed-order-result.interface';
import { ParsedSettlements, Settlement } from './interfaces/parsed-settlements.interface';
import { ParsedTransactions, Trade } from './interfaces/parsed-transactions.interface';
import { ParsedPlaceOrderResponse, PlaceOrderResponse } from './interfaces/parsed-place-order-response.interface';
import { ParsedReplaceOrderResponse, ReplaceOrderResponse } from './interfaces/parsed-replace-order-response.interface';

type Range = '0d' | '3d' | '1m' | '3m';

const SDK = Symbol('Client#sdk');
const STREAMER = Symbol('Client#streamer');

export class Client {
  private [SDK]: CoreSdk;
  private [STREAMER]: Streamer;

  constructor(config: ClientConfig) {
    const { apiUrl, apiKey, apiSecret, certPath, certPass = '', aid } = config;
    this[SDK] = new CoreSdk(apiUrl, '', apiKey, apiSecret, '', certPath, certPass, aid);
  }

  get sdk(): CoreSdk {
    return this[SDK];
  }

  get streamer(): Streamer {
    return this[STREAMER];
  }

  async login(account: string, password: string): Promise<void> {
    this.sdk.login(account, password);
    this[STREAMER] = new Streamer(this.sdk.getWsUrl());
  }

  // Must login first
  async placeOrder(order: Order): Promise<PlaceOrderResponse> {
    const response = this.sdk.order(order.toObject());
    const parsed = JSON.parse(response) as ParsedPlaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async replacePrice(order: OrderResult, price: number): Promise<ReplaceOrderResponse> {
    order.ordno = order.ordno ? order.ordno : order.preordno;
    const response = this.sdk.modifyPrice(order, price)
    const parsed = JSON.parse(response) as ParsedReplaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async replaceQuantity(order: OrderResult, quantity: number): Promise<ReplaceOrderResponse> {
    order.ordno = order.ordno ? order.ordno : order.preordno;
    const response = this.sdk.modifyVolume(order, quantity);
    const parsed = JSON.parse(response) as ParsedReplaceOrderResponse;
    return parsed.data;
  }

  // Must login first
  async cancelOrder(order: OrderResult): Promise<ReplaceOrderResponse> {
    return this.replaceQuantity(order, 0);
  }

  // Must login first
  async replaceOrder(order: OrderResult, options: { price?: number, quantity?: number }): Promise<ReplaceOrderResponse> {
    if (!!options?.price !== !!options?.quantity) {
      if (options.price) return this.replacePrice(order, options.price);
      if (options.quantity) return this.replaceQuantity(order, options.quantity);
    }
    throw new TypeError('One and only one of the "price" or "quantity" options must be specified');
  }

  // Must login first
  async getOrders(): Promise<OrderResult[]> {
    const response = this.sdk.getOrderResult();
    const parsed = JSON.parse(response) as ParsedOrderResult;
    return parsed.data.orderResults;
  }

  // Must login first
  async getTransactions(range: Range): Promise<Trade[]> {
    const response = this.sdk.getTransactions(range);
    const parsed = JSON.parse(response) as ParsedTransactions;
    return parsed.data.matsums;
  }

  // Must login first
  async getInventories(): Promise<Stock[]> {
    const response = this.sdk.getInventories();
    const parsed = JSON.parse(response) as ParsedInventories;
    return parsed.data.stksums;
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
