import { FugleTrade } from '../src';

describe('FugleTrade', () => {
  describe('constructor()', () => {
    it('should create FugleTrade instance with config file', async () => {
      const fugle = new FugleTrade({
        configPath: './test/fixtures/config.ini',
        certPass: 'password',
      });
      expect(fugle).toBeInstanceOf(FugleTrade);
    });

    it('should create FugleTrade instance with config option', async () => {
      const fugle = new FugleTrade({
        config: {
          apiUrl: 'http://localhost:3000/api/v1',
          apiKey: 'XXXXXXXXXXXXXXXX',
          apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          certPath: './FugleTrade_A123456789_20221025.p12',
          aid: '88400000000',
        },
        certPass: 'password',
      });
      expect(fugle).toBeInstanceOf(FugleTrade);
    });
  });
});
