export enum Trade {
  Cash = '0', // 現股
  Margin = '3', // 融資
  Short = '4', // 融券
  DayTrading = '9', // 自動當沖
  DayTradingSell = 'A', // 現股當沖賣
}
