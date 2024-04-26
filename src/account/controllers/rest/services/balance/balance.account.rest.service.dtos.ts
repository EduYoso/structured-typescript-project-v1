import { createZodDto } from 'nestjs-zod';
import { AccountData } from '../../../../domain/entity/account.entity.data';
import { z } from 'zod';

export const BalanceAccountRestServiceParamsDTOSchema = z.object({
  nickname: z.string(),
});

export class BalanceAccountRestServiceParamsDTO extends createZodDto(
  BalanceAccountRestServiceParamsDTOSchema,
) {}

export type BalanceAccountRestServiceResponseDTO = {
  account: AccountData;
};
