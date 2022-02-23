export interface Settlement {
  date: string;
  cdate: string;
  price: string;
}

export interface ParsedSettlements {
  data: {
    settlements: Settlement[];
  };
}
