import { OrderSide, ApCode, PriceFlag, BsFlag, Trade } from '../enums';

export class Order {
  stockNo?: string;
  buySell?: OrderSide;
  price?: number;
  quantity?: number;
  apCode?: ApCode;
  priceFlag?: PriceFlag;
  bsFlag?: BsFlag;
  trade?: Trade;
}
