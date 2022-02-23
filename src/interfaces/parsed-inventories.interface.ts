export interface StockDate {
  tDate: string;
  ttime: string;
  trade: string;
  bs: string;
  ordno: string;
  price: string;
  price603: string;
  qty: string;
  qtyr: string;
  qtyh: string;
  qtyc: string;
  fee: string;
  tax: string;
  taxg: string;
  payn: string;
  costr: string;
  valueMkt: string;
  valueNow: string;
  makeA: string;
  makeAPer: string;
  priceEvn: string;
}

export interface Stock {
  stkdats: StockDate[];
  stkNo: string;
  stkNa: string;
  bhNo: string;
  cSeq: string;
  apcode: string;
  trade: string;
  stype: string;
  qtyL: string;
  qtyB: string;
  qtyS: string;
  qtyC: string;
  qtyBm: string;
  qtySm: string;
  costQty: string;
  costSum: string;
  priceQtySum: string;
  priceAvg: string;
  valueMkt: string;
  valueNow: string;
  recVaSum: string;
  makeASum: string;
  makeAPer: string;
  priceEvn: string;
  priceMkt: string;
  priceNow: string;
}

export interface ParsedInventories {
  data: {
    stksums: Stock[];
  }
}
