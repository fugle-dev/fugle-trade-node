export interface TradeDate {
  tDate: string;
  stkNo: string;
  stkNa: string;
  branchNo: string;
  trade: string;
  sType: string;
  bs: string;
  orderNo: string;
  price: string;
  qty: string;
  priceQty: string;
  fee: string;
  tax: string;
  taxg: string;
  dbFee: string;
  pays: string;
  payn: string;
  make: string;
  makePer: string;
  cDate: string;
}

export interface Trade {
  matdats: TradeDate[],
  tDate: string;
  stkNo: string;
  stkNa: string;
  bhNo: string;
  cSeq: string;
  trade: string;
  stype: string;
  bs: string;
  qty: string;
  priceQty: string;
  priceAvg: string;
  cost: string;
  recv: string;
  make: string;
  makePer: string;
  cDate: string;
}

export interface ParsedTransactions {
  data: {
    matsums: Trade[];
  };
}
