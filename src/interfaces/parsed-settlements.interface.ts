export interface Settlement {
  date: string;
  cDate: string;
  price: string;
}

export interface ParsedSettlements {
  data: {
    settlements: Settlement[];
  };
}
