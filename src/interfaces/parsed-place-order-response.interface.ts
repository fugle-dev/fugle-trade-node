export interface PlaceOrderResponse {
  retCode: string;
  retMsg: string;
  workDate: string;
  ordType: string;
  ordNo: string;
  ordDate: string;
  ordTime: string;
}

export interface ParsedPlaceOrderResponse {
  data: PlaceOrderResponse;
}
