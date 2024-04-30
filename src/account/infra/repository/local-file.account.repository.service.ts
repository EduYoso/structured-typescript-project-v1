import { join } from 'path';
import { Account } from '../../domain/entity/account.entity';
import { AccountRepository } from '../../domain/repository/account.repository';
import { AccountData } from '../../domain/entity/account.entity.data';
import { readFile, writeFile } from 'fs/promises';
import { InternalServerHeyNovaError } from '@heynova/common/errors';

type JsonFile = Record<string, AccountData>;

const jsonFilePath = join(__dirname, '../../../../accounts.json');

const assertJsonFile = async (): Promise<void> => {
  try {
    await readFile(jsonFilePath, 'utf-8');
  } catch (e) {
    await writeFile(jsonFilePath, '{}');
  }
};

const loadJsonFile = async (): Promise<JsonFile> => {
  await assertJsonFile();
  try {
    const file = await readFile(jsonFilePath, 'utf-8');
    const json = JSON.parse(file);
    return json;
  } catch (e) {
    throw new InternalServerHeyNovaError({
      message: 'Error loading json file',
    });
  }
};

const saveJsonFile = async (json: JsonFile): Promise<void> => {
  await assertJsonFile();
  try {
    await writeFile(jsonFilePath, JSON.stringify(json, null, 2));
  } catch (e) {
    throw new InternalServerHeyNovaError({ message: 'Error saving json file' });
  }
};

export class AccountRepositoryService implements AccountRepository {
  async create(account: Account): Promise<void> {
    const loadedJson = await loadJsonFile();
    loadedJson[account.id] = account.toJSON();
    await saveJsonFile(loadedJson);
  }

  async findUnique(
    params: AccountRepository.FindUnique.Params,
  ): Promise<AccountRepository.FindUnique.Response> {
    if (params.where.id) {
      const accountById = await this.getById(params.where.id);

      return { account: accountById };
    }

    if (params.where.nickname) {
      const accountByNickname = await this.getByNickname(params.where.nickname);

      return { account: accountByNickname };
    }

    return { account: undefined };
  }

  private async getById(id: string): Promise<Account | undefined> {
    const loadedJson = await loadJsonFile();
    const accountData = loadedJson[id];
    return accountData ? new Account(accountData) : undefined;
  }

  private async getByNickname(nickname: string): Promise<Account | undefined> {
    const loadedJson = await loadJsonFile();
    const accounts = Object.values(loadedJson);

    for (const account of accounts) {
      if (account.nickname === nickname) {
        return new Account(account);
      }
    }
  }

  async updateBalance(updatedAccount: Account): Promise<void> {
    const loadedJson = await loadJsonFile();
    loadedJson[updatedAccount.id] = updatedAccount.toJSON();
    await saveJsonFile(loadedJson);
  }
}
