export interface ReplaceOrderResponse {
  retCode: string;
  retMsg: string;
  ordDate: string;
  ordTime: string;
}

export interface ParsedReplaceOrderResponse {
  data: ReplaceOrderResponse;
}
