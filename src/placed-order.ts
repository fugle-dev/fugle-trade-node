import { Side, ApCode, PriceFlag, BsFlag, TradeType } from './enums';
import { PlacedOrderPayload, OrderResult } from './interfaces';

const PAYLOAD = Symbol('PlacedOrder#payload');

export class PlacedOrder {
  private [PAYLOAD]: PlacedOrderPayload;

    constructor(payload: any) {
    /* istanbul ignore next */
    this[PAYLOAD] = {
      ...payload,
      ...(payload.apCode && { apCode: String(payload.apCode) as ApCode }),
      ...(payload.avgPrice && { avgPrice: Number(payload.avgPrice) }),
      ...(payload.bsFlag && { bsFlag: String(payload.bsFlag) as BsFlag }),
      ...(payload.buySell && { buySell: String(payload.buySell) as Side }),
      ...(payload.celable && { celable: String(payload.celable) }),
      ...(payload.celQty && { celQty: Number(payload.celQty) }),
      //...(payload.celQty_share && { celqty_share: Number(payload.celqty_share) }),
      ...(payload.errCode && { errCode: String(payload.errCode) }),
      ...(payload.errMsg && { errMsg: String(payload.errMsg) }),
      ...(payload.matQty && { matQty: Number(payload.matQty) }),
      //...(payload.matqty_share && { matqty_share: Number(payload.matqty_share) }),
      ...(payload.odPrice && { odPrice: Number(payload.odPrice) }),
      ...(payload.ordDate && { ordDate: String(payload.ordDate) }),
      ...(payload.ordNo && { ordNo: String(payload.ordNo) }),
      ...(payload.ordStatus && { ordStatus: String(payload.ordStatus) }),
      ...(payload.orgQty && { orgqty: Number(payload.orgQty) }),
      //...(payload.orgqty_share && { orgqty_share: Number(payload.orgqty_share) }),
      ...(payload.preOrdNo && { preOrdNo: String(payload.preOrdNo) }),
      ...(payload.priceFlag && { priceFlag: String(payload.priceFlag) as PriceFlag }),
      ...(payload.stockNo && { stockNo: String(payload.stockNo) }),
      ...(payload.trade && { trade: String(payload.trade) as TradeType }),
      ...(payload.workDate && { workDate: String(payload.workDate) }),
    };
  }

  get payload(): PlacedOrderPayload {
    return this[PAYLOAD];
  }

  toObject(): OrderResult {
    return Object
      .entries(this.payload)
      .reduce((object, [key, value]) =>
        ({ ...object, [key]: String(value) }),
        {} as OrderResult,
      );
  }
}
