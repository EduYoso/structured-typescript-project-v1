import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../../services/account/account.service';
import {
  WithdrawAccountRestServiceParamsDTO,
  WithdrawAccountRestServiceResponseDTO,
} from './withdraw.account.rest.service.dtos';
import { NotFoundHeyNovaError } from '@heynova/common/errors';

type Params = WithdrawAccountRestServiceParamsDTO;
type Response = WithdrawAccountRestServiceResponseDTO;

@Injectable()
export class WithdrawAccountRestService {
  constructor(private readonly accountService: AccountService) {}

  async execute(params: Params): Promise<Response> {
    const { account: accountExists } = await this.accountService.get({
      by: { nickname: params.nickname },
    });

    if (!accountExists)
      throw new NotFoundHeyNovaError({
        message: 'Account not found',
        info: params,
      });

    const account = this.accountService.withdraw({
      toAccount: accountExists,
      data: { value: params.value },
    });

    return account;
  }
}
