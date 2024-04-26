import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import {
  HeyNovaExceptionFilter,
  HeyNovaZodValidationPipe,
} from '@heynova/core';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new HeyNovaZodValidationPipe());
  app.useGlobalFilters(
    new HeyNovaExceptionFilter({
      onException: (e) => {
        console.log(e);
      },
    }),
  );
  await app.listen(3000, () => {
    console.log('Servidor rodando da porta 3000');
  });
};

bootstrap();
