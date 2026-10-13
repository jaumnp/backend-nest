import type { QuestionAttachment } from '../../enterprise/entities/question-attachment.ts';

export interface IQuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
  deleteManyByQuestionId(questionId: string): Promise<void>;
}
