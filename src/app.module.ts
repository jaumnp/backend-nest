import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { AccountCreateController } from './controllers/account-create.controller.js';
import { AccountCreateService } from './services/account-create.service.js';

@Module({
  controllers: [AccountCreateController],
  providers: [AccountCreateService, PrismaService],
})
export class AppModule {}
