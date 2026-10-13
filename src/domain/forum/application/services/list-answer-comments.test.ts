import { expect, beforeEach, describe, it } from 'vitest';
import { AnswerCommentInMemoryRepository } from '../../../../../tests/repository/InMemory/answerCommentInMemory.repository.ts';
import { makeAnswerComment } from '../../../../../tests/factory/make-answer-comment.ts';
import { ListAnswerComments } from './list-answer-comments.ts';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.ts';

let repository: AnswerCommentInMemoryRepository;
let sut: ListAnswerComments;

describe('List Answer Comments', () => {
  beforeEach(() => {
    repository = new AnswerCommentInMemoryRepository();
    sut = new ListAnswerComments(repository);
  });

  it('should be able to fetch answer comments', async () => {
    await repository.create(
      makeAnswerComment({
        answerId: UniqueEntityId.create('answer-1'),
      }),
    );

    await repository.create(
      makeAnswerComment({
        answerId: UniqueEntityId.create('answer-1'),
      }),
    );

    await repository.create(
      makeAnswerComment({
        answerId: UniqueEntityId.create('answer-1'),
      }),
    );

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.answerComments).toHaveLength(3);
  });

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeAnswerComment({
          answerId: UniqueEntityId.create('answer-1'),
        }),
      );
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.answerComments).toHaveLength(2);
  });
});
