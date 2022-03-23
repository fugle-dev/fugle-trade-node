export interface OrderResult {
  workDate: string;
  ordDate: string;
  ordTime: string;
  ordStatus: string;
  ordNo: string;
  preOrdNo: string;
  stockNo: string;
  buySell: string;
  apCode: string;
  priceFlag: string;
  trade: string;
  odPrice: string;
  orgQty: string;
  matQty: string;
  celQty: string;
  celable: string;
  errCode: string;
  errMsg: string;
  avgPrice: string;
  bsFlag: string;
}

export interface ParsedOrderResult {
  data: {
    orderResults: OrderResult[];
  };
}
