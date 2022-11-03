export interface MarketStatus {
  isTradingDay: boolean;
  lastTradingDay: string;
  nextTradingDay: string;
}

export interface ParsedMarketStatus {
  data: MarketStatus;
}
