import { AccountData } from '../../../../domain/entity/account.entity.data';

export type WithdrawAccountRestServiceParamsDTO = {
  nickname: string;
  value: number;
};

export type WithdrawAccountRestServiceResponseDTO = {
  account: AccountData;
};
