import { FugleTradeOptions, ClientConfig } from './interfaces';
import { readConfigFile } from './utils';
import { Client } from './client';

export class FugleTrade extends Client {
  constructor(options: FugleTradeOptions = {}) {
    const config = {
      ...(options.configPath ? readConfigFile(options.configPath) : {} as ClientConfig),
      ...(options.config || {} as ClientConfig),
      certPass: options.certPass || '',
    };
    super(config);
  }
}
