import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { TEnv } from './env/index.ts';

async function run() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get<ConfigService<TEnv, true>>(ConfigService);
  const port = config.get('PORT', { infer: true });

  await app.listen(port);
}

await run();
