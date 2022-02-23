export interface ReplaceOrderResponse {
  retcode: string;
  retmsg: string;
  ordDate: string;
  ordTime: string;
}

export interface ParsedReplaceOrderResponse {
  data: ReplaceOrderResponse;
}
