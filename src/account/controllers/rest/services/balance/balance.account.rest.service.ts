import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../../services/account/account.service';
import {
  BalanceAccountRestServiceParamsDTO,
  BalanceAccountRestServiceResponseDTO,
} from './balance.account.rest.service.dtos';

type Params = BalanceAccountRestServiceParamsDTO;
type Response = BalanceAccountRestServiceResponseDTO;

@Injectable()
export class BalanceAccountRestService {
  constructor(private readonly accountService: AccountService) {}

  async execute(params: Params): Promise<Response> {
    const { account } = await this.accountService.get({
      by: { nickname: params.nickname },
    });

    if (!account) throw new Error('account not found');

    return { account };
  }
}
