import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { MessageKind } from './enums';
import { CONNECT_EVENT, DISCONNECT_EVENT, MESSAGE_EVENT, ERROR_EVENT, ORDER_EVENT, TRADE_EVENT } from './constants';

const EMITTER = Symbol('Streamer#emitter');
const SOCKET = Symbol('Streamer#socket');

export class Streamer {
  private [EMITTER]: EventEmitter;
  private [SOCKET]: WebSocket;

  constructor(private readonly url: string) {
    this[EMITTER] = new EventEmitter();
    this.emitter.on(MESSAGE_EVENT, message => this.handleMessage(message));
  }

  get emitter(): EventEmitter {
    return this[EMITTER];
  }

  get socket(): WebSocket {
    return this[SOCKET];
  }

  on(eventName: string, listener: (...args: any[]) => void): EventEmitter {
    return this.emitter.on(eventName, listener);
  }

  once(eventName: string, listener: (...args: any[]) => void): EventEmitter {
    return this.emitter.once(eventName, listener);
  }

  removeListener(eventName: string, listener: (...args: any[]) => void): EventEmitter {
    return this.emitter.removeListener(eventName, listener);
  }

  removeAllListeners(event: string): EventEmitter {
    return this.emitter.removeAllListeners(event);
  }

  eventNames(): (string | symbol)[] {
    return this.emitter.eventNames();
  }

  listeners(eventName: string): Function[] {
    return this.emitter.listeners(eventName);
  }

  listenerCount(eventName: string): number {
    return this.emitter.listenerCount(eventName);
  }

  connect(): this {
    this[SOCKET] = new WebSocket(this.url);
    this.socket.onopen = () => this.emitter.emit(CONNECT_EVENT);
    this.socket.onmessage = message => this.emitter.emit(MESSAGE_EVENT, message.data);
    this.socket.onerror = () => this.emitter.emit(ERROR_EVENT);
    this.socket.onclose = () => this.emitter.emit(DISCONNECT_EVENT);
    return this;
  }

  disconnect(): this {
    this.socket.close();
    return this;
  }

  private handleMessage(message: any): void {
    try {
      const msg = JSON.parse(message);
      const kind = JSON.parse(msg['data']['$value'])['Kind'] as MessageKind;
      const handleMessage = {
        [MessageKind.ACK]: () => this.emitter.emit(ORDER_EVENT, message),
        [MessageKind.MAT]: () => this.emitter.emit(TRADE_EVENT, message),
      };
      handleMessage[kind] && handleMessage[kind]();
    } catch (err) {
      return;
    }
  }
}
