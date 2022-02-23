import { ClientConfig } from './client-config.interface';

export interface FugleTradeOptions {
  configPath?: string;
  config?: ClientConfig;
  certPass?: string;
}
