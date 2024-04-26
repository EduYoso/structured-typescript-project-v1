import { Injectable } from '@nestjs/common';
import {
  BalanceAccountServiceParamsDTO,
  BalanceAccountServiceResponseDTO,
} from './balance.account.service.dtos';

type Params = BalanceAccountServiceParamsDTO;
type Response = BalanceAccountServiceResponseDTO;

@Injectable()
export class BalanceAccountService {
  async execute(params: Params): Promise<Response> {
    const account = params.toAccount;

    return { account };
  }
}
