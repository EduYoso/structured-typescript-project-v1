import { BalanceAccountRestServiceResponseDTO } from './services/balance/balance.account.rest.service.dtos';
import { CreateAccountRestService } from './services/create/create.account.rest.service';
import {
  CreateAccountRestServiceParamsDTOSchema,
  CreateAccountRestServiceResponseDTO,
} from './services/create/create.account.rest.service.dtos';
import { DepositAccountRestService } from './services/deposit/deposit.account.rest.service';
import {
  DepositAccountRestServiceParamsDTOSchema,
  DepositAccountRestServiceResponseDTO,
} from './services/deposit/deposit.account.rest.service.dtos';
import { WithdrawAccountRestService } from './services/withdraw/withdraw.account.rest.service';
import { WithdrawAccountRestServiceResponseDTO } from './services/withdraw/withdraw.account.rest.service.dtos';
import { BalanceAccountRestService } from './services/balance/balance.account.rest.service';

export class AccountRestController {
  constructor(
    private readonly createAccountRestService: CreateAccountRestService,
    private readonly depositAccountRestService: DepositAccountRestService,
    private readonly withdrawAccountRestService: WithdrawAccountRestService,
    private readonly balanceAccountRestService: BalanceAccountRestService,
  ) {}
  async create(params: unknown): Promise<CreateAccountRestServiceResponseDTO> {
    const paramsDTO = CreateAccountRestServiceParamsDTOSchema.parse(params);
    return this.createAccountRestService.execute(paramsDTO);
  }

  async deposit(
    params: unknown,
  ): Promise<DepositAccountRestServiceResponseDTO> {
    const paramsDTO = DepositAccountRestServiceParamsDTOSchema.parse(params);
    return this.depositAccountRestService.execute(paramsDTO);
  }

  async withdraw(
    params: unknown,
  ): Promise<WithdrawAccountRestServiceResponseDTO> {
    if (typeof params !== 'object') throw new Error('invalid params');
    if (params === null) throw new Error('invalid params');
    if (Array.isArray(params)) throw new Error('invalid params');
    const { nickname } = params as { nickname?: unknown };
    if (typeof nickname !== 'string') throw new Error('invalid nickname');
    const { value } = params as { value?: unknown };
    if (typeof value !== 'string') throw new Error('invalid value');
    const valueNumber = Number(value);
    if (isNaN(valueNumber)) throw new Error('invalid value');

    return this.withdrawAccountRestService.execute({
      nickname,
      value: valueNumber,
    });
  }

  async balance(
    params: unknown,
  ): Promise<BalanceAccountRestServiceResponseDTO> {
    if (typeof params !== 'object') throw new Error('invalid params');
    if (params === null) throw new Error('invalid params');
    if (Array.isArray(params)) throw new Error('invalid params');
    const { nickname } = params as { nickname?: unknown };
    if (typeof nickname !== 'string') throw new Error('invalid nickname');

    return this.balanceAccountRestService.execute({
      nickname,
    });
  }
}
