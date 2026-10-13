import { IPaginationParams } from '../../../../core/repository/pagination-params.ts';
import { IAnswerCommentsRepository } from '../../../../domain/forum/application/repository/answer-comment-repository.ts';
import { AnswerComment } from '../../../../domain/forum/enterprise/entities/answer-comment.ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswerCommentsRepository implements IAnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.');
  }
  findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.');
  }
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
