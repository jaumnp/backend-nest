import { IPaginationParams } from '../../../../core/repository/pagination-params.ts';
import { IQuestionCommentsRepository } from '../../../../domain/forum/application/repository/questio-comment-repository.ts';
import { QuestionComment } from '../../../../domain/forum/enterprise/entities/question-comment.ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionCommentsRepository implements IQuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.');
  }
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.');
  }
  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
