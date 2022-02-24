import { readFileSync } from 'fs';
import { WS } from 'jest-websocket-mock';
import { Streamer } from '../src/streamer';

const url = 'ws://localhost:1234';

describe('Streamer', () => {
  let server: WS;

  beforeEach(async () => {
    server = new WS(url);
  });

  afterEach(() => {
    WS.clean();
  });

  describe('.connect()', () => {
    it('should establish the connection', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.once('connect', cb);
      streamer.connect();
      await server.connected;
      expect(cb).toBeCalledTimes(1);
    });
  });

  describe('.disconnect()', () => {
    it('should close the connection', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.once('disconnect', cb);
      streamer.connect();
      await server.connected;
      streamer.disconnect();
      await server.closed;
      expect(cb).toBeCalledTimes(1);
    });
  });

  describe('.on()', () => {
    it('should add the listener', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.emitter.on = jest.fn();
      streamer.on('message', cb);
      expect(streamer.emitter.on).toBeCalledWith('message', cb);
    });
  });

  describe('.once()', () => {
    it('should add one-time listener', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.emitter.once = jest.fn();
      streamer.once('message', cb);
      expect(streamer.emitter.once).toBeCalledWith('message', cb);
    });
  });

  describe('.removeListener()', () => {
    it('should remove the listener', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.emitter.removeListener = jest.fn();
      streamer.removeListener('message', cb);
      expect(streamer.emitter.removeListener).toBeCalledWith('message', cb);
    });
  });

  describe('.removeAllListener()', () => {
    it('should remove the listener', async () => {
      const streamer = new Streamer(url);
      streamer.emitter.removeAllListeners = jest.fn();
      streamer.removeAllListeners('message');
      expect(streamer.emitter.removeAllListeners).toBeCalledWith('message');
    });
  });

  describe('.eventNames()', () => {
    it('should get the listening events', async () => {
      const streamer = new Streamer(url);
      streamer.emitter.eventNames = jest.fn();
      streamer.eventNames();
      expect(streamer.emitter.eventNames).toBeCalledTimes(1);
    });
  });

  describe('.listeners()', () => {
    it('should get listeners', async () => {
      const streamer = new Streamer(url);
      streamer.emitter.listeners = jest.fn();
      streamer.listeners('message');
      expect(streamer.emitter.listeners).toBeCalledWith('message');
    });
  });

  describe('.listenerCount()', () => {
    it('should get the number of listeners', async () => {
      const streamer = new Streamer(url);
      streamer.emitter.listenerCount = jest.fn();
      streamer.listenerCount('message');
      expect(streamer.emitter.listenerCount).toBeCalledWith('message');
    });
  });

  describe('.handleMessage()', () => {
    it('should receive message', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.once('message', cb);
      streamer.connect();
      await server.connected;
      const response = readFileSync('./test/fixtures/message-connect.txt').toString();
      server.send(response);
      expect(cb).toBeCalledWith(response);
    });

    it('should emit the order event', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.once('order', cb);
      streamer.connect();
      await server.connected;
      const response = readFileSync('./test/fixtures/message-order.txt').toString();
      server.send(response);
      expect(cb).toBeCalledWith(response);
    });

    it('should emit the trade event', async () => {
      const cb = jest.fn();
      const streamer = new Streamer(url);
      streamer.once('trade', cb);
      streamer.connect();
      await server.connected;
      const response = readFileSync('./test/fixtures/message-trade.txt').toString();
      server.send(response);
      expect(cb).toBeCalledWith(response);
    });
  });
});
