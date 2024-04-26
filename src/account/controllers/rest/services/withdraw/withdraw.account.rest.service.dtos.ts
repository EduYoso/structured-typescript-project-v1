import { createZodDto } from 'nestjs-zod';
import { AccountData } from '../../../../domain/entity/account.entity.data';
import { z } from 'zod';

export const WithdrawAccountRestServiceParamsDTOSchema = z.object({
  nickname: z.string(),
  value: z.coerce.number(),
});

export class WithdrawAccountRestServiceParamsDTO extends createZodDto(
  WithdrawAccountRestServiceParamsDTOSchema,
) {}

export type WithdrawAccountRestServiceResponseDTO = {
  account: AccountData;
};
