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
  userDef: string;
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

//helper function to map memo prop to userDef, can be remove after sdk update
export function renameInventoriesMemoToUserDef(parsedTransactions: ParsedInventories): ParsedInventories {
  // Helper function to rename memo to userDef in StockDat objects
  const renameInStockDat = (stockDat: StockDat & { memo?: string }): StockDat => {
    const { memo, ...rest } = stockDat;
    return { ...rest, userDef: memo || "" };
  };

  // Helper function to rename memo to userDef in Stock objects
  const renameInStkDat = (trade: Stock): Stock => {
    const renamedStkDats = trade.stkDats.map(renameInStockDat);
    return { ...trade, stkDats: renamedStkDats };
  };

  // Map through the stkSums array and rename memo to userDef
  const renamedStkSums = parsedTransactions.data.stkSums.map(renameInStkDat);

  // Return the updated ParsedInventories object
  return { data: { stkSums: renamedStkSums } };
}
