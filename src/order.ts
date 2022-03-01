import { OrderObject } from '@fugle/trade-core';
import { OrderSide, ApCode, PriceFlag, BsFlag, Trade } from './enums';
import { Order as IOrder } from './interfaces';

const PAYLOAD = Symbol('Order#payload');

export class Order {
  private [PAYLOAD]: IOrder;

  constructor(payload?: IOrder) {
    this[PAYLOAD] = payload || {};
  }

  get payload(): IOrder {
    return this[PAYLOAD];
  }

  setSymbol(symbol: string): this {
    this.payload.stockNo = symbol;
    return this;
  }

  setSide(side: OrderSide): this {
    this.payload.buySell = side;
    return this;
  }

  setPrice(price: number): this {
    this.payload.price = price;
    return this;
  }

  setQuantity(quantity: number): this {
    this.payload.quantity = quantity;
    return this;
  }

  setApCode(apCode: ApCode): this {
    this.payload.apCode = apCode;
    return this;
  }

  setPriceFlag(priceFlag: PriceFlag): this {
    this.payload.priceFlag = priceFlag;
    return this;
  }

  setBsFlag(bsFlag: BsFlag): this {
    this.payload.bsFlag = bsFlag;
    return this;
  }

  setTrade(trade: Trade): this {
    this.payload.trade = trade;
    return this;
  }

  toObject(): OrderObject {
    return {
      stockNo: String(this.payload.stockNo),
      buySell: String(this.payload.buySell),
      price: String(this.payload.price),
      quantity: String(this.payload.quantity),
      apCode: String(this.payload.apCode),
      priceFlag: String(this.payload.priceFlag),
      bsFlag: String(this.payload.bsFlag),
      trade: String(this.payload.trade),
    };
  }
}
