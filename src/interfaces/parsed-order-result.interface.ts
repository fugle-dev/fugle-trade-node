export interface OrderResult {
  workdate: string;
  orddate: string;
  ordtime: string;
  syscode: string;
  ordstatus: string;
  ordno: string;
  preordno: string;
  stockno: string;
  buysell: string;
  apcode: string;
  priceflag: string;
  trade: string;
  odprice: string;
  orgqty: string;
  matqty: string;
  celqty: string;
  celable: string;
  errcode: string;
  errmsg: string;
  avgPrice: string;
  chgtime: string;
  chgdate: string;
  bsFlag: string;
}

export interface ParsedOrderResult {
  data: {
    orderResults: OrderResult[];
  };
}
