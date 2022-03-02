import { Side, ApCode, PriceFlag, BsFlag, Trade } from './enums';
import { PlacedOrderPayload, OrderResult } from './interfaces';

const PAYLOAD = Symbol('PlacedOrder#payload');

export class PlacedOrder {
  private [PAYLOAD]: PlacedOrderPayload;

  constructor(payload: any) {
    this[PAYLOAD] = {
      ...payload,
      ...(payload.apcode && { apcode: String(payload.apcode) as ApCode }),
      ...(payload.avgPrice && { avgPrice: Number(payload.avgPrice) }),
      ...(payload.bsFlag && { bsFlag: String(payload.bsFlag) as BsFlag }),
      ...(payload.buysell && { buysell: String(payload.buysell) as Side }),
      ...(payload.celable && { celable: String(payload.celable) }),
      ...(payload.celqty && { celqty: Number(payload.celqty) }),
      ...(payload.celqty_share && { celqty_share: Number(payload.celqty_share) }),
      ...(payload.chgdate && { chgdate: String(payload.chgdate) }),
      ...(payload.errcode && { errcode: String(payload.errcode) }),
      ...(payload.errmsg && { errmsg: String(payload.errmsg) }),
      ...(payload.matqty && { matqty: Number(payload.matqty) }),
      ...(payload.matqty_share && { matqty_share: Number(payload.matqty_share) }),
      ...(payload.odprice && { odprice: Number(payload.odprice) }),
      ...(payload.orddate && { orddate: String(payload.orddate) }),
      ...(payload.ordno && { ordno: String(payload.ordno) }),
      ...(payload.ordstatus && { ordstatus: String(payload.ordstatus) }),
      ...(payload.orgqty && { orgqty: Number(payload.orgqty) }),
      ...(payload.orgqty_share && { orgqty_share: Number(payload.orgqty_share) }),
      ...(payload.preordno && { preordno: String(payload.preordno) }),
      ...(payload.priceflag && { priceflag: String(payload.priceflag) as PriceFlag }),
      ...(payload.stockno && { stockno: String(payload.stockno) }),
      ...(payload.trade && { trade: String(payload.trade) as Trade }),
      ...(payload.workdate && { workdate: String(payload.workdate) }),
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
