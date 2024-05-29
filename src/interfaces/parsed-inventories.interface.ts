export interface StockDat {
  buySell: string;
  costR: string;
  fee: string;
  makeA: string;
  makeAPer: string;
  ordNo: string;
  payN: string;
  price: string;
  price603: string;
  priceEvn: string;
  qty: string;
  qtyC: string;
  qtyH: string;
  qtyR: string;
  tDate: string;
  tax: string;
  taxG: string;
  trade: string;
  tTime: string;
  valueMkt: string;
  valueNow: string;
  memo: string;
}

export interface Stock {
  apCode: string;
  costQty: string;
  costSum: string;
  makeAPer: string;
  makeASum: string;
  priceAvg: string;
  priceEvn: string;
  priceMkt: string;
  priceNow: string;
  priceQtySum: string;
  qtyB: string;
  qtyBm: string;
  qtyC: string;
  qtyL: string;
  qtyS: string;
  qtySm: string;
  recVaSum: string;
  stkNa: string;
  stkNo: string;
  sType: string;
  trade: string;
  valueMkt: string;
  valueNow: string;
  stkDats: StockDat[];
}

export interface ParsedInventories {
  data: {
    stkSums: Stock[];
  }
}
