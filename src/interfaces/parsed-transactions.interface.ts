export interface TradeDate {
  buySell: string;
  cDate: string;
  dbFee: string;
  fee: string;
  make: string;
  makePer: string;
  orderNo: string;
  payN: string;
  price: string;
  priceQty: string;
  qty: string;
  sType: string;
  stkNa: string;
  stkNo: string;
  tDate: string;
  tTime: string;
  tax: string;
  taxG: string;
  trade: string;
  memo: string;
}

export interface Trade {
  buySell: string;
  cDate: string;
  cost: string;
  make: string;
  makePer: string;
  priceAvg: string;
  priceQty: string;
  qty: string;
  recv: string;
  stkNa: string;
  stkNo: string;
  sType: string;
  tDate: string;
  trade: string;
  matDats: TradeDate[],
}

export interface ParsedTransactions {
  data: {
    matSums: Trade[];
  };
}
