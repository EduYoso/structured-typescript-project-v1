import { Injectable } from '@nestjs/common';
import { DepositAccountServiceParamsDTO } from './deposit.account.service.dtos';
import { DepositAccountServiceResponseDTO } from './deposit.account.service.dtos';
import { AccountRepositoryService } from '../../infra';
import { BadRequestHeyNovaError } from '@heynova/common/errors';

type Params = DepositAccountServiceParamsDTO;
type Response = DepositAccountServiceResponseDTO;

@Injectable()
export class DepositAccountService {
  constructor(private accountRepository: AccountRepositoryService) {}

  async execute(params: Params): Promise<Response> {
    if (params.data.value <= 0)
      throw new BadRequestHeyNovaError({
        message: 'invalid value',
        info: params,
      });

    const account = params.toAccount;
    account.addBalance(params.data.value);

    await this.accountRepository.updateBalance(account);

    return { account };
  }
}
