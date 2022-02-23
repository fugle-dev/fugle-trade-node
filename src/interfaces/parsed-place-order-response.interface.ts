export interface PlaceOrderResponse {
  retcode: string;
  retmsg: string;
  workDate: string;
  ordType: string;
  ordno: string;
  ordDate: string;
  ordTime: string;
}

export interface ParsedPlaceOrderResponse {
  data: PlaceOrderResponse;
}
