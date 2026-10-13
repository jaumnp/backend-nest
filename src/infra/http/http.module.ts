import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.ts';
import { AuthenticateController } from './controllers/authenticate.controller.ts';
import { QuestionCreateController } from './controllers/create-question.controller.ts';
import { FetchQuestionsController } from './controllers/fetch-questions.controller.ts';
import { AuthenticateServices } from '../services/authenticate.service.ts';
import { QuestionCreateService } from '../services/question-create.service.ts';
import { FetchQuestionsService } from '../services/fetch-questions.service.ts';

@Module({
  controllers: [
    AuthenticateController,
    QuestionCreateController,
    FetchQuestionsController,
  ],
  providers: [
    PrismaService,
    AuthenticateServices,
    QuestionCreateService,
    FetchQuestionsService,
  ],
})
export class HttpModule {}
