import { IPaginationParams } from '../../../../core/repository/pagination-params.ts';
import { IQuestionRepository } from '../../../../domain/forum/application/repository/question-repository.ts';
import { Question } from '../../../../domain/forum/enterprise/entities/question.ts';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.ts';
import { PrismaQuestionMapper } from '../mappers/prisma-question.mapper.ts';

@Injectable()
export class PrismaQuestionsRepository implements IQuestionRepository {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Question[] | null> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) return null;

    return PrismaQuestionMapper.toDomain(question);
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.');
  }
  findManyRecent(params: IPaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }
  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
