import { FugleTradeOptions, ClientConfig } from './interfaces';
import { readConfigFile } from './utils';
import { Client } from './client';

export class FugleTrade extends Client {
  constructor(options: FugleTradeOptions = {}) {
    const config = {
      ...(options.configPath ? readConfigFile(options.configPath) : {}),
      ...(options.config || {}),
    } as ClientConfig;

    if (!options.configPath && !options.config) throw new TypeError('One of the "configPath" or "config" options must be specified');
    if (!config.apiUrl) throw new TypeError('Invalid configuration: "config.apiUrl" is required');
    if (!config.apiKey) throw new TypeError('Invalid configuration: "config.apiKey" is required');
    if (!config.apiSecret) throw new TypeError('Invalid configuration: "config.apiSecret" is required');
    if (!config.certPath) throw new TypeError('Invalid configuration: "config.certPath" is required');
    if (!config.aid) throw new TypeError('Invalid configuration: "config.aid" is required');

    super(config);
  }
}
