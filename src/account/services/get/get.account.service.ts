import { Injectable } from '@nestjs/common';
import {
  GetAccountServiceParamsDTO,
  GetAccountServiceResponseDTO,
} from './get.account.service.dtos';
import { AccountRepositoryService } from '../../infra';

type Params = GetAccountServiceParamsDTO;
type Response = GetAccountServiceResponseDTO;

@Injectable()
export class GetAccountService {
  constructor(private readonly accountRepository: AccountRepositoryService) {}

  async execute(params: Params): Promise<Response> {
    const { account } = await this.accountRepository.findUnique({
      where: params.by,
    });

    if (!account) return { account: undefined };

    return { account };
  }
}

// Acho que eu não estou usando o get...
