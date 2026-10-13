import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/index.ts';
import { AuthModule } from './auth/auth.module.ts';
import { HttpModule } from './http/http.module.ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
