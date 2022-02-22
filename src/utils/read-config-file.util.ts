import * as fs from 'fs';
import * as ini from 'ini';
import { ClientConfig } from '../interfaces';

export function readConfigFile(path: string): ClientConfig {
  const config = ini.parse(fs.readFileSync(path, 'utf-8'));

  return {
    apiUrl: config?.Core?.Entry,
    apiKey:config?.Api?.Key,
    apiSecret: config?.Api?.Secret,
    certPath: config?.Cert?.Path,
    aid: config?.User?.Account,
  };
}
