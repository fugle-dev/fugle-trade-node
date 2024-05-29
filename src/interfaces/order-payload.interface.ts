import { Side, ApCode, PriceFlag, BsFlag, TradeType } from '../enums';

export interface OrderPayload {
  stockNo?: string;
  buySell?: Side;
  price?: number;
  quantity?: number;
  apCode?: ApCode;
  priceFlag?: PriceFlag;
  bsFlag?: BsFlag;
  trade?: TradeType;
  memo?: string;
}
