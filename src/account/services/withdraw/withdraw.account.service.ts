import { Injectable } from '@nestjs/common';
import {
  WithdrawAccountServiceParamsDTO,
  WithdrawAccountServiceResponseDTO,
} from './withdraw.account.service.dtos';
import { AccountRepositoryService } from '../../infra';
import { BadRequestHeyNovaError } from '@heynova/common/errors';

type Params = WithdrawAccountServiceParamsDTO;
type Response = WithdrawAccountServiceResponseDTO;

@Injectable()
export class WithdrawAccountService {
  constructor(private accountRepository: AccountRepositoryService) {}

  async execute(params: Params): Promise<Response> {
    const withdrawValue = params.data.value;
    const currentBalance = params.toAccount.balance;

    if (withdrawValue <= 0)
      throw new BadRequestHeyNovaError({
        message: 'invalid value',
        info: params,
      });
    if (withdrawValue > currentBalance)
      throw new BadRequestHeyNovaError({
        message: 'not enough balance',
        info: params,
      });

    const account = params.toAccount;
    account.removeBalance(params.data.value);

    await this.accountRepository.updateBalance(account);

    return { account };
  }
}
