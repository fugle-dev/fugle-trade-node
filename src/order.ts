import { OrderObject } from '@fugle/trade-core';
import { Side, ApCode, PriceFlag, BsFlag, TradeType } from './enums';
import { OrderPayload } from './interfaces';

const PAYLOAD = Symbol('Order#payload');

export class Order {
  public static Side = Side;
  public static ApCode = ApCode;
  public static PriceFlag = PriceFlag;
  public static BsFlag = BsFlag;
  public static Trade = TradeType;
  private [PAYLOAD]: OrderPayload;

  constructor(payload?: OrderPayload) {
    this[PAYLOAD] = payload || {};
  }

  get payload(): OrderPayload {
    return this[PAYLOAD];
  }

  setSymbol(symbol: string): this {
    this.payload.stockNo = symbol;
    return this;
  }

  setSide(side: Side): this {
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

  setTradeType(tradeType: TradeType): this {
    this.payload.trade = tradeType;
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
