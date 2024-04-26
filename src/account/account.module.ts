import { Module } from '@nestjs/common';
import * as Controllers from './controllers';
import * as RestServices from './controllers/rest/services';
import * as Services from './services';
import * as Infra from './infra';

const controllers = Object.values(Controllers);
const restServices = Object.values(RestServices);
const services = Object.values(Services);
const infra = Object.values(Infra);

@Module({
  controllers: [...controllers],
  providers: [...restServices, ...services, ...infra],
})
export class AccountModule {}
