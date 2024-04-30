import { Injectable } from '@nestjs/common';
import { Account } from '../../domain/entity/account.entity';
import { CreateAccountServiceParamsDTO } from './create.account.service.dtos';
import { CreateAccountServiceResponseDTO } from './create.account.service.dtos';
import { randomUUID } from 'crypto';
import { AccountRepositoryService } from '../../infra';
import { AlreadyExistsHeyNovaError } from '@heynova/common/errors';

type Params = CreateAccountServiceParamsDTO;
type Response = CreateAccountServiceResponseDTO;

@Injectable()
export class CreateAccountService {
  constructor(private accountRepository: AccountRepositoryService) {}

  async execute(params: Params): Promise<Response> {
    const accountWithNicknameExists = await this.accountRepository.findUnique({
      where: { nickname: params.data.nickname },
    });

    if (accountWithNicknameExists.account)
      throw new AlreadyExistsHeyNovaError({
        message: 'Account with nickname already exists',
      });
    const accountId = randomUUID();

    const account = new Account({
      id: accountId,
      balance: 0,
      nickname: params.data.nickname,
    });

    await this.accountRepository.create(account);

    return { account };
  }
}
