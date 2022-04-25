import * as keytar from 'keytar';
import * as inquirer from 'inquirer';
import { Credentials } from '../interfaces';
import { FUGLETRADE_NODE_PASSWORD, FUGLETRADE_NODE_CERTPASS } from '../constants';

export async function loadCredentials(account: string): Promise<Credentials> {
  const questions = [];

  const password = await keytar.getPassword(FUGLETRADE_NODE_PASSWORD, account);
  !password && questions.push({ type: 'password', message: 'Enter esun account password', name: 'password', mask: '*' });

  const certPass = await keytar.getPassword(FUGLETRADE_NODE_CERTPASS, account);
  !certPass && questions.push({ type: 'password', message: 'Enter cert password', name: 'certPass', mask: '*' });

  const anwsers = questions.length && await inquirer.prompt(questions);
  anwsers.password && await keytar.setPassword(FUGLETRADE_NODE_PASSWORD, account, anwsers.password);
  anwsers.certPass && await keytar.setPassword(FUGLETRADE_NODE_CERTPASS, account, anwsers.certPass);

  return {
    password: password || anwsers.password,
    certPass: certPass || anwsers.certPass,
  };
}
