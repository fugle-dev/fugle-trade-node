import { Side, ApCode, PriceFlag, BsFlag, Trade } from '../enums';

export interface PlacedOrderPayload {
  apcode?: ApCode;
  avgPrice?: number;
  bsFlag?: BsFlag;
  buysell?: Side;
  celable?: string;
  celqty?: number;
  celqty_share?: number;
  chgdate?: string;
  errcode?: string;
  errmsg?: string;
  matqty?: number;
  matqty_share?: number;
  odprice?: number;
  orddate?: string;
  ordno?: string;
  ordstatus?: string;
  orgqty?: number;
  orgqty_share?: number;
  preordno?: string;
  priceflag?: PriceFlag;
  stockno?: string;
  trade?: Trade;
  workdate?: string;
}
