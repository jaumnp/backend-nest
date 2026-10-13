import type { Answer } from '../../../src/domain/forum/enterprise/entities/answer.ts';
import type { IAnswerRepository } from '../../../src/domain/forum/application/repository/answer-repository.ts';
import type { IAnswerAttachmentsRepository } from '../../../src/domain/forum/application/repository/answer-attachment-repository.ts';
import { DomainEvents } from '../../../src/core/events/domain-events.ts';
import { IPaginationParams } from '@/core/repository/pagination-params.ts';

export class AnswerInMemoryRepository implements IAnswerRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(questionId: string, { page }: IPaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer) {
    this.items.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items[itemIndex] = answer;

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }
}
