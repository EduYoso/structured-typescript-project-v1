import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../../services/account/account.service';
import {
  WithdrawAccountRestServiceParamsDTO,
  WithdrawAccountRestServiceResponseDTO,
} from './withdraw.account.rest.service.dtos';

type Params = WithdrawAccountRestServiceParamsDTO;
type Response = WithdrawAccountRestServiceResponseDTO;

@Injectable()
export class WithdrawAccountRestService {
  constructor(private readonly accountService: AccountService) {}

  async execute(params: Params): Promise<Response> {
    const { account: accountExists } = await this.accountService.get({
      by: { nickname: params.nickname },
    });

    if (!accountExists) throw new Error('account not found');

    const account = this.accountService.withdraw({
      toAccount: accountExists,
      data: { value: params.value },
    });

    return account;
  }
}
