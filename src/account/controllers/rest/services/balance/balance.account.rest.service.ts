import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../../services/account/account.service';
import {
  BalanceAccountRestServiceParamsDTO,
  BalanceAccountRestServiceResponseDTO,
} from './balance.account.rest.service.dtos';
import { NotFoundHeyNovaError } from '@heynova/common/errors';

type Params = BalanceAccountRestServiceParamsDTO;
type Response = BalanceAccountRestServiceResponseDTO;

@Injectable()
export class BalanceAccountRestService {
  constructor(private readonly accountService: AccountService) {}

  async execute(params: Params): Promise<Response> {
    const { account } = await this.accountService.get({
      by: { nickname: params.nickname },
    });

    if (!account)
      throw new NotFoundHeyNovaError({
        message: 'Account not found',
        info: params,
      });

    return { account };
  }
}
