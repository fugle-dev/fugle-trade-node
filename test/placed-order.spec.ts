import { PlacedOrder } from '../src/placed-order';

describe('PlacedOrder', () => {
  describe('#constructor()', () => {
    it('should create PlacedOrder instance', () => {
      const placedOrder = new PlacedOrder({
        workDate: '20220222',
        ordDate: '20220222',
        ordTime: '130000000',
        ordStatus: '2',
        ordNo: 'B9999',
        preOrdNo: '',
        stockNo: '0050',
        buySell: 'B',
        apCode: '5',
        priceFlag: '0',
        trade: '0',
        odPrice: '140.0',
        orgQty: '1000',
        matQty: '0',
        celQty: '0',
        celable: '2',
        errCode: '00000000',
        errMsg: '',
        avgPrice: '0.0',
        bsFlag: 'R',
      });
      expect(placedOrder).toBeInstanceOf(PlacedOrder);
      expect(placedOrder.payload.orgQty).toBe(1000);
      expect(placedOrder.payload.matQty).toBe(0);
      expect(placedOrder.payload.celQty).toBe(0);
      expect(placedOrder.payload.odPrice).toBe(140);
      expect(placedOrder.payload.avgPrice).toBe(0);
    });
  });



  describe('.toObject()', () => {
    it('should return OrderObject', () => {
      const placedOrder = new PlacedOrder({
        workDate: '20220222',
        ordDate: '20220222',
        ordTime: '130000000',
        ordStatus: '2',
        ordNo: 'B9999',
        preOrdNo: '',
        stockNo: '0050',
        buySell: 'B',
        apCode: '5',
        priceFlag: '0',
        trade: '0',
        odPrice: '140.0',
        orgQty: '1000',
        matQty: '0',
        celQty: '0',
        celable: '2',
        errCode: '00000000',
        errMsg: '',
        avgPrice: '0.0',
        bsFlag: 'R',
      });

      expect(placedOrder.toObject()).toEqual({
        workDate: '20220222',
        ordDate: '20220222',
        ordTime: '130000000',
        ordStatus: '2',
        ordNo: 'B9999',
        preOrdNo: '',
        stockNo: '0050',
        buySell: 'B',
        apCode: '5',
        priceFlag: '0',
        trade: '0',
        odPrice: '140',
        orgQty: '1000',
        matQty: '0',
        celQty: '0',
        celable: '2',
        errCode: '00000000',
        errMsg: '',
        avgPrice: '0',
        bsFlag: 'R',
      });
    });
  });
});
