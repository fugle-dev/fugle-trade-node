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
  userDef: string;
}

export interface ParsedOrderResultHistory {
  data: {
    orderResultHistory: OrderResultHistory[];
  };
}

//helper function to map memo prop to userDef, can be remove after sdk update
export function renameMemoToUserDef(parsedTransactions: ParsedOrderResultHistory): ParsedOrderResultHistory {
  // Helper function to rename memo to userDef in OrderResultHistory objects
  const renameInOrderResultHistory = (tradeDate: OrderResultHistory & { memo?: string }): OrderResultHistory => {
    const { memo, ...rest } = tradeDate;
    return { ...rest, userDef: memo || "" };
  };

  // Map through the orderResultHistory array and rename memo to userDef
  const renamedOrderResultHistory = parsedTransactions.data.orderResultHistory.map(renameInOrderResultHistory);

  // Return the updated ParsedOrderResultHistory object
  return { data: { orderResultHistory: renamedOrderResultHistory } };
}
