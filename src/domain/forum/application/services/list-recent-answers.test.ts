import { expect } from 'vitest';
import { beforeEach, describe, it } from 'vitest';
import { AnswerInMemoryRepository } from '../../../../../tests/repository/InMemory/answersInMemory.repository.ts';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.ts';
import { makeAnswer } from '../../../../../tests/factory/make-answer.ts';
import { ListRecentAnswers } from './list-recent.aswers.ts';
import { AnswerAttachmentsInMemoryRepository } from '../../../../../tests/repository/InMemory/answerAttachementInMemory.repository.ts';

let answerAttachmentsRepository: AnswerAttachmentsInMemoryRepository;
let repository: AnswerInMemoryRepository;
let sut: ListRecentAnswers;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new AnswerAttachmentsInMemoryRepository();
    repository = new AnswerInMemoryRepository(answerAttachmentsRepository);
    sut = new ListRecentAnswers(repository);
  });

  it('should be able to list question answers', async () => {
    await repository.create(
      makeAnswer({
        questionId: UniqueEntityId.create('question-1'),
      }),
    );
    await repository.create(
      makeAnswer({
        questionId: UniqueEntityId.create('question-1'),
      }),
    );
    await repository.create(
      makeAnswer({
        questionId: UniqueEntityId.create('question-1'),
      }),
    );

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.answers).toHaveLength(3);
  });

  it('should be able to list paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeAnswer({
          questionId: UniqueEntityId.create('question-1'),
        }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.answers).toHaveLength(2);
  });
});
