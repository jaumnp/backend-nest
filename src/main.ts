import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function run() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}

await run();
