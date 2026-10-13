import type { AnswerAttachment } from '../../enterprise/entities/answer-attachment.ts';

export interface IAnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
  deleteManyByAnswerId(answerId: string): Promise<void>;
}
