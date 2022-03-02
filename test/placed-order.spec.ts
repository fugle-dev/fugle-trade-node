import { PlacedOrder } from '../src/placed-order';

describe('PlacedOrder', () => {
  describe('#constructor()', () => {
    it('should create PlacedOrder instance', () => {
      const placedOrder = new PlacedOrder({
        workdate: '20220222',
        orddate: '20220222',
        ordtime: '130000000',
        syscode: 'FI',
        ordstatus: '2',
        ordno: 'B9999',
        preordno: '',
        stockno: '0050',
        buysell: 'B',
        apcode: '5',
        priceflag: '0',
        trade: '0',
        odprice: '140.0',
        orgqty: '1000',
        matqty: '0',
        celqty: '0',
        celable: '2',
        errcode: '00000000',
        errmsg: '',
        avgPrice: '0.0',
        chgtime: '130000000',
        chgdate: '20220222',
        bsFlag: 'R',
      });
      expect(placedOrder).toBeInstanceOf(PlacedOrder);
      expect(placedOrder.payload.orgqty).toBe(1000);
      expect(placedOrder.payload.matqty).toBe(0);
      expect(placedOrder.payload.celqty).toBe(0);
      expect(placedOrder.payload.odprice).toBe(140);
      expect(placedOrder.payload.avgPrice).toBe(0);
    });
  });



  describe('.toObject()', () => {
    it('should return OrderObject', () => {
      const placedOrder = new PlacedOrder({
        workdate: '20220222',
        orddate: '20220222',
        ordtime: '130000000',
        syscode: 'FI',
        ordstatus: '2',
        ordno: 'B9999',
        preordno: '',
        stockno: '0050',
        buysell: 'B',
        apcode: '5',
        priceflag: '0',
        trade: '0',
        odprice: '140.0',
        orgqty: '1000',
        matqty: '0',
        celqty: '0',
        celable: '2',
        errcode: '00000000',
        errmsg: '',
        avgPrice: '0.0',
        chgtime: '130000000',
        chgdate: '20220222',
        bsFlag: 'R',
      });

      expect(placedOrder.toObject()).toEqual({
        workdate: '20220222',
        orddate: '20220222',
        ordtime: '130000000',
        syscode: 'FI',
        ordstatus: '2',
        ordno: 'B9999',
        preordno: '',
        stockno: '0050',
        buysell: 'B',
        apcode: '5',
        priceflag: '0',
        trade: '0',
        odprice: '140',
        orgqty: '1000',
        matqty: '0',
        celqty: '0',
        celable: '2',
        errcode: '00000000',
        errmsg: '',
        avgPrice: '0',
        chgtime: '130000000',
        chgdate: '20220222',
        bsFlag: 'R',
      });
    });
  });
});
