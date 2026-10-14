import { Module } from '@nestjs/common';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments.repository.ts';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments.repository.ts';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers.repository.ts';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments.repository.ts';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comment.repository.ts';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions.repository.ts';

@Module({
  providers: [
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
})
export class DatabaseModule {}
