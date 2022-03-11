import * as fs from 'fs';
import * as ini from 'ini';
import { ClientConfig } from '../interfaces';

export function readConfigFile(path: string): ClientConfig {
  const config = ini.parse(fs.readFileSync(path, 'utf-8'));

  return {
    apiUrl: config && config.Core && config.Core.Entry,
    apiKey: config && config.Api && config.Api.Key,
    apiSecret: config && config.Api && config.Api.Secret,
    certPath: config && config.Cert && config.Cert.Path,
    aid: config && config.User && config.User.Account,
  };
}
