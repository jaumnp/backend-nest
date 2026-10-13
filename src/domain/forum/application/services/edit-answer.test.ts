import { expect } from 'vitest';
import { AnswerInMemoryRepository } from '../../../../../tests/repository/InMemory/answersInMemory.repository.ts';
import { beforeEach, describe, it } from 'vitest';
import { makeAnswer } from '../../../../../tests/factory/make-answer.ts';
import { EditAnswer } from './edit-answer.ts';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.ts';
import { AnswerAttachmentsInMemoryRepository } from '../../../../../tests/repository/InMemory/answerAttachementInMemory.repository.ts';

let answerAttachmentsRepository: AnswerAttachmentsInMemoryRepository;
let repository: AnswerInMemoryRepository;
let sut: EditAnswer;

describe('Edit Answer', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new AnswerAttachmentsInMemoryRepository();
    repository = new AnswerInMemoryRepository(answerAttachmentsRepository);
    sut = new EditAnswer(repository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: UniqueEntityId.create('author-1'),
      },
      UniqueEntityId.create('answer-1'),
    );

    await repository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteúdo teste',
    });

    expect(repository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    });
  });

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: UniqueEntityId.create('author-1'),
      },
      UniqueEntityId.create('answer-1'),
    );

    await repository.create(newAnswer);

    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-2',
      content: 'Conteúdo teste',
    });

    expect(result.isFailure()).toBe(true);
  });
});
