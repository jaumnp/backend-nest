import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import z from 'zod';
import { QuestionSchema } from '../controllers/fetch-questions.controller.js';

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
