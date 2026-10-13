import { IPaginationParams } from '../../../../core/repository/pagination-params.ts';
import { IQuestionRepository } from '../../../../domain/forum/application/repository/question-repository.ts';
import { Question } from '../../../../domain/forum/enterprise/entities/question.ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionsRepository implements IQuestionRepository {
  findAll(): Promise<Question[] | null> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Question | null> {
    throw new Error('Method not implemented.');
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
