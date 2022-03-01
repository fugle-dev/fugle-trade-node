import { Side, ApCode, PriceFlag, BsFlag, Trade } from '../enums';

export class Order {
  stockNo?: string;
  buySell?: Side;
  price?: number;
  quantity?: number;
  apCode?: ApCode;
  priceFlag?: PriceFlag;
  bsFlag?: BsFlag;
  trade?: Trade;
}
