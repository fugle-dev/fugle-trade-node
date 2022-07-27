import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { MessageKind } from './enums';
import { CONNECT_EVENT, DISCONNECT_EVENT, MESSAGE_EVENT, ERROR_EVENT, ORDER_EVENT, TRADE_EVENT } from './constants';
import { convertWsObject } from '@fugle/trade-core';

const SOCKET = Symbol('Streamer#socket');

export class Streamer extends EventEmitter {
  private [SOCKET]!: WebSocket;

  constructor(private readonly url: string) {
    super();
  }

  get socket(): WebSocket {
    return this[SOCKET];
  }

  set socket(socket: WebSocket) {
    this[SOCKET] = socket;
  }

  connect(): this {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => this.emit(CONNECT_EVENT);
    this.socket.onmessage = event => this.emit(MESSAGE_EVENT, event.data);
    this.socket.onerror = event => this.emit(ERROR_EVENT, event.error);
    this.socket.onclose = () => this.emit(DISCONNECT_EVENT);
    this.on(MESSAGE_EVENT, message => this.handleMessage(message));
    return this;
  }

  disconnect(): this {
    this.socket.close();
    return this;
  }

  private handleMessage(message: string): void {
    try {
      const msg = JSON.parse(convertWsObject(message));
      const kind = msg.kind as MessageKind;
      const handleMessage = {
        [MessageKind.ACK]: () => this.emit(ORDER_EVENT, msg),
        [MessageKind.MAT]: () => this.emit(TRADE_EVENT, msg),
      };
      handleMessage[kind] && handleMessage[kind]();
    } catch (err) {
      return;
    }
  }
}
