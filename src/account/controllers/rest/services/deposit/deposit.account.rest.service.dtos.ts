import { z } from 'zod';
import { AccountData } from '../../../../domain/entity/account.entity.data';
import { createZodDto } from 'nestjs-zod';

export const DepositAccountRestServiceParamsDTOSchema = z.object({
  nickname: z.string(),
  value: z.coerce.number(),
});

export class DepositAccountRestServiceParamsDTO extends createZodDto(
  DepositAccountRestServiceParamsDTOSchema,
) {}

export type DepositAccountRestServiceResponseDTO = {
  account: AccountData;
};
