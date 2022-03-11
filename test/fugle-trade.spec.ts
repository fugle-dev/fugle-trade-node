import { FugleTrade } from '../src';

describe('FugleTrade', () => {
  describe('#constructor()', () => {
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

    it('should throw error when missing config.apiUrl', async () => {
      expect(() => {
        new FugleTrade({
          config: {
            apiKey: 'XXXXXXXXXXXXXXXX',
            apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            certPath: './FugleTrade_A123456789_20221025.p12',
            aid: '88400000000',
          },
          certPass: 'password',
        });
      }).toThrow(TypeError);
    });

    it('should throw error when missing options', async () => {
      expect(() => {
        new FugleTrade();
      }).toThrow(TypeError);
    });

    it('should throw error when missing config.apiKey', async () => {
      expect(() => {
        new FugleTrade({
          config: {
            apiUrl: 'http://localhost:3000/api/v1',
            apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            certPath: './FugleTrade_A123456789_20221025.p12',
            aid: '88400000000',
          },
          certPass: 'password',
        });
      }).toThrow(TypeError);
    });

    it('should throw error when missing config.apiSecret', async () => {
      expect(() => {
        new FugleTrade({
          config: {
            apiUrl: 'http://localhost:3000/api/v1',
            apiKey: 'XXXXXXXXXXXXXXXX',
            certPath: './FugleTrade_A123456789_20221025.p12',
            aid: '88400000000',
          },
          certPass: 'password',
        });
      }).toThrow(TypeError);
    });

    it('should throw error when missing config.certPath', async () => {
      expect(() => {
        new FugleTrade({
          config: {
            apiUrl: 'http://localhost:3000/api/v1',
            apiKey: 'XXXXXXXXXXXXXXXX',
            apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            aid: '88400000000',
          },
          certPass: 'password',
        });
      }).toThrow(TypeError);
    });

    it('should throw error when missing config.aid', async () => {
      expect(() => {
        new FugleTrade({
          config: {
            apiUrl: 'http://localhost:3000/api/v1',
            apiKey: 'XXXXXXXXXXXXXXXX',
            apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            certPath: './FugleTrade_A123456789_20221025.p12',
          },
          certPass: 'password',
        });
      }).toThrow(TypeError);
    });

    it('should throw error when missing config.aid', async () => {
      expect(() => {
        new FugleTrade({
          config: {
            apiUrl: 'http://localhost:3000/api/v1',
            apiKey: 'XXXXXXXXXXXXXXXX',
            apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            certPath: './FugleTrade_A123456789_20221025.p12',
            aid: '88400000000',
          },
        });
      }).toThrow(TypeError);
    });
  });
});
