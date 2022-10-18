export interface BalanceStatus {
  availableBalance: Number,
  exchangeBalance: Number,
  stockPreSaveAmount: Number
}

export interface ParsedBalanceStatus {
  data: BalanceStatus;
}
