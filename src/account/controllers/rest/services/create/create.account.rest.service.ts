import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../../services/account/account.service';
import {
  CreateAccountRestServiceParamsDTO,
  CreateAccountRestServiceResponseDTO,
} from './create.account.rest.service.dtos';

type Params = CreateAccountRestServiceParamsDTO;
type Response = CreateAccountRestServiceResponseDTO;

@Injectable()
export class CreateAccountRestService {
  constructor(private readonly accountService: AccountService) {}

  async execute(params: Params): Promise<Response> {
    const { account } = await this.accountService.create({ data: params });

    return { account: account.toJSON() };
  }
}
