import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service.js';
import { AccountCreateService } from './services/account-create.service.js';
import { envSchema } from './env/index.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthenticateController } from './controllers/authenticate.controller.js';
import { QuestionCreateService } from './services/question-create.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AuthenticateController],
  providers: [AccountCreateService, QuestionCreateService, PrismaService],
})
export class AppModule {}
