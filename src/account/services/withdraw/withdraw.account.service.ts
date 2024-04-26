import { Injectable } from '@nestjs/common';
import {
  WithdrawAccountServiceParamsDTO,
  WithdrawAccountServiceResponseDTO,
} from './withdraw.account.service.dtos';
import { AccountRepositoryService } from '../../infra';

type Params = WithdrawAccountServiceParamsDTO;
type Response = WithdrawAccountServiceResponseDTO;

@Injectable()
export class WithdrawAccountService {
  constructor(private accountRepository: AccountRepositoryService) {}

  async execute(params: Params): Promise<Response> {
    const withdrawValue = params.data.value;
    const currentBalance = params.toAccount.balance;

    if (withdrawValue <= 0) throw new Error('invalid value');
    if (withdrawValue > currentBalance) throw new Error('not enough balance');

    const account = params.toAccount;
    account.removeBalance(params.data.value);

    await this.accountRepository.updateBalance(account);

    return { account };
  }
}
