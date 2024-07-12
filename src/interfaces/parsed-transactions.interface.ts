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
  userDef: string;
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

//helper function to map memo prop to userDef, can be remove after sdk update
export function renameTransactionsMemoToUserDef(parsedTransactions: ParsedTransactions): ParsedTransactions {
  // Helper function to rename memo to userDef in TradeDate objects
  const renameInTradeDate = (tradeDate: TradeDate & { memo?: string }): TradeDate => {
    const { memo, ...rest } = tradeDate;
    return { ...rest, userDef: memo || "" };
  };

  // Helper function to rename memo to userDef in Trade objects
  const renameInTrade = (trade: Trade): Trade => {
    const renamedMatDats = trade.matDats.map(renameInTradeDate);
    return { ...trade, matDats: renamedMatDats };
  };

  // Map through the matSums array and rename memo to userDef
  const renamedMatSums = parsedTransactions.data.matSums.map(renameInTrade);

  // Return the updated ParsedTransactions object
  return { data: { matSums: renamedMatSums } };
}
