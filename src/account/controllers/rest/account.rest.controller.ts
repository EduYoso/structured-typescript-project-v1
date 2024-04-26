import {
  BalanceAccountRestServiceParamsDTO,
  BalanceAccountRestServiceResponseDTO,
} from './services/balance/balance.account.rest.service.dtos';
import { CreateAccountRestService } from './services/create/create.account.rest.service';
import {
  CreateAccountRestServiceParamsDTO,
  CreateAccountRestServiceResponseDTO,
} from './services/create/create.account.rest.service.dtos';
import { DepositAccountRestService } from './services/deposit/deposit.account.rest.service';
import {
  DepositAccountRestServiceParamsDTO,
  DepositAccountRestServiceResponseDTO,
} from './services/deposit/deposit.account.rest.service.dtos';
import { WithdrawAccountRestService } from './services/withdraw/withdraw.account.rest.service';
import {
  WithdrawAccountRestServiceParamsDTO,
  WithdrawAccountRestServiceResponseDTO,
} from './services/withdraw/withdraw.account.rest.service.dtos';
import { BalanceAccountRestService } from './services/balance/balance.account.rest.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('/bank')
export class AccountRestController {
  constructor(
    private readonly createAccountRestService: CreateAccountRestService,
    private readonly depositAccountRestService: DepositAccountRestService,
    private readonly withdrawAccountRestService: WithdrawAccountRestService,
    private readonly balanceAccountRestService: BalanceAccountRestService,
  ) {}

  @Get('/create-account')
  async create(
    @Query() query: CreateAccountRestServiceParamsDTO,
  ): Promise<CreateAccountRestServiceResponseDTO> {
    return this.createAccountRestService.execute(query);
  }

  @Get('/deposit')
  async deposit(
    @Query() query: DepositAccountRestServiceParamsDTO,
  ): Promise<DepositAccountRestServiceResponseDTO> {
    return this.depositAccountRestService.execute(query);
  }

  @Get('/withdraw')
  async withdraw(
    @Query() query: WithdrawAccountRestServiceParamsDTO,
  ): Promise<WithdrawAccountRestServiceResponseDTO> {
    return this.withdrawAccountRestService.execute(query);
  }

  @Get('/balance')
  async balance(
    @Query() query: BalanceAccountRestServiceParamsDTO,
  ): Promise<BalanceAccountRestServiceResponseDTO> {
    return this.balanceAccountRestService.execute(query);
  }
}
