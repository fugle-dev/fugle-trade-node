export interface TradeStatus {
    dayTradeCode: ''|'X'|'Y'|'N'|'S'
    marginCode: ''|'0'|'1'|'2'|'9'
    shortCode: ''|'0'|'1'|'2'|'9'
    tradeLimit: Number
    marginLimit: Number
    shortLimit: Number
}

export interface ParsedTradeStatus {
  data: TradeStatus;
}
