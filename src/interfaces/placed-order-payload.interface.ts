import { Side, ApCode, PriceFlag, BsFlag, TradeType } from '../enums';

export interface PlacedOrderPayload {
  apCode?: ApCode;
  avgPrice?: number;
  bsFlag?: BsFlag;
  buySell?: Side;
  celable?: string;
  celQty?: number;
  celQtyShare?: number;
  errCode?: string;
  errMsg?: string;
  matQty?: number;
  matqtyShare?: number;
  odPrice?: number;
  orDdate?: string;
  ordNo?: string;
  ordStatus?: string;
  orgQty?: number;
  orgQtyShare?: number;
  preOrdNo?: string;
  priceFlag?: PriceFlag;
  stockNo?: string;
  trade?: TradeType;
  workDate?: string;
}
