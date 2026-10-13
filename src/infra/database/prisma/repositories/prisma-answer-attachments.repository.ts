import { IAnswerAttachmentsRepository } from '../../../../domain/forum/application/repository/answer-attachment-repository.ts';
import { AnswerAttachment } from '../../../../domain/forum/enterprise/entities/answer-attachment.ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswerAttachmentsRepository implements IAnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.');
  }
  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
