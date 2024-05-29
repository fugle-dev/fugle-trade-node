export interface OrderResultHistory {
  ackDate: string;
  ordDate: string;
  ordTime: string;
  etype: string;
  ordNo: string;
  stockNo: string;
  buysell: string;
  trade: string;
  odPrice: string;
  orgQty: string;
  orgQtyShare: string;
  matQty: string;
  matQtyShare: string;
  celQty: string;
  celQtyShare: string;
  delStatus?: string;
  errCode: string;
  errMsg: string;
  avgPrice: string;
  bsFlag: string;
  source?: string;
  market: string;
  memo: string;
}

export interface ParsedOrderResultHistory {
  data: {
    orderResultHistory: OrderResultHistory[];
  };
}
