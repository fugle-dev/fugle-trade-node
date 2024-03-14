import { Side, ApCode, PriceFlag, BsFlag, TradeType } from './enums';
import { PlacedOrderPayload, OrderResult } from './interfaces';

const PAYLOAD = Symbol('PlacedOrder#payload');

export class PlacedOrder {
  private [PAYLOAD]: PlacedOrderPayload;

  constructor(payload: Record<string, string>) {
    /* istanbul ignore next */
    this[PAYLOAD] = {
      ...payload,
      ...(payload.apCode && { apCode: String(payload.apCode) as ApCode }),
      ...(payload.avgPrice && { avgPrice: Number(payload.avgPrice) }),
      ...(payload.bsFlag && { bsFlag: String(payload.bsFlag) as BsFlag }),
      ...(payload.buySell && { buySell: String(payload.buySell) as Side }),
      ...(payload.celable && { celable: String(payload.celable) }),
      ...(payload.celQty && { celQty: Number(payload.celQty) }),
      ...(payload.celQtyShare && { celQtyShare: Number(payload.celQtyShare) }),
      ...(payload.errCode && { errCode: String(payload.errCode) }),
      ...(payload.errMsg && { errMsg: String(payload.errMsg) }),
      ...(payload.matQty && { matQty: Number(payload.matQty) }),
      ...(payload.matQtyShare && { matQtyShare: Number(payload.matQtyShare) }),
      ...(payload.odPrice && { odPrice: Number(payload.odPrice) }),
      ...(payload.ordDate && { ordDate: String(payload.ordDate) }),
      ...(payload.ordNo && { ordNo: String(payload.ordNo) }),
      ...(payload.ordStatus && { ordStatus: String(payload.ordStatus) }),
      ...(payload.orgQty && { orgQty: Number(payload.orgQty) }),
      ...(payload.orgQtyShare && { orgQtyShare: Number(payload.orgQtyShare) }),
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

  toModifiedObject(unit: number): OrderResult {
    return Object.entries(this.payload).reduce((object, [key, value]) => {
      if (
        key.endsWith("Qty") &&
        this.payload.apCode &&
        [ApCode.Odd, ApCode.Emg, ApCode.IntradayOdd].includes(
          this.payload.apCode
        )
      )
        return { ...object, [key]: String(Math.floor(value * unit)) };
      return { ...object, [key]: String(value) };
    }, {} as OrderResult);
  }
}
