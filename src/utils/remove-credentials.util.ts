import * as keytar from 'keytar';
import { FUGLETRADE_NODE_PASSWORD, FUGLETRADE_NODE_CERTPASS } from '../constants';

export async function removeCredentials(account: string): Promise<void> {
  await Promise.all([
    keytar.deletePassword(FUGLETRADE_NODE_PASSWORD, account),
    keytar.deletePassword(FUGLETRADE_NODE_CERTPASS, account),
  ]);
}
