import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.ts';
import { QuestionSchema } from '../http/controllers/fetch-questions.controller.ts';

@Injectable()
export class FetchQuestionsService {
  constructor(private prisma: PrismaService) {}

  async execute(page: QuestionSchema) {
    const qnty = 1;

    const response = await this.prisma.question.findMany({
      take: qnty,
      skip: (page - 1) * qnty,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response;
  }
}
