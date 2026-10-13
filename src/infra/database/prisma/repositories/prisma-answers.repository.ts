import { IPaginationParams } from '../../../../core/repository/pagination-params.ts';
import { IAnswerRepository } from '../../../../domain/forum/application/repository/answer-repository.ts';
import { Answer } from '../../../../domain/forum/enterprise/entities/answer.ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswersRepository implements IAnswerRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.');
  }
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.');
  }
  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
