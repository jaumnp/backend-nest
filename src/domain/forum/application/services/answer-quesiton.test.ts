import { it, expect } from 'vitest';
import { CreateAnswerQuestion } from './answer-question.ts';
import { AnswerInMemoryRepository } from '../../../../../tests/repository/InMemory/answersInMemory.repository.ts';
import { beforeEach, describe } from 'vitest';
import type { IAnswerAttachmentsRepository } from '../repository/answer-attachment-repository.ts';
import { AnswerAttachmentsInMemoryRepository } from '../../../../../tests/repository/InMemory/answerAttachementInMemory.repository.ts';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.ts';

let answerAttachmentsInMemoryRepository: IAnswerAttachmentsRepository;
let repository: AnswerInMemoryRepository;
let sut: CreateAnswerQuestion;

describe('create an answer', () => {
  beforeEach(() => {
    answerAttachmentsInMemoryRepository =
      new AnswerAttachmentsInMemoryRepository();
    repository = new AnswerInMemoryRepository(
      answerAttachmentsInMemoryRepository,
    );
    sut = new CreateAnswerQuestion(repository);
  });

  it('should create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isSuccess()).toBe(true);
    expect(repository.items[0]).toEqual(result.value.answer);
    expect(repository.items[0]?.attachments.currentItems).toHaveLength(2);
    expect(repository.items[0]?.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: UniqueEntityId.create('1') }),
      expect.objectContaining({ attachmentId: UniqueEntityId.create('2') }),
    ]);

    const { answer } = result.value;
    expect(answer.content).toEqual('Conteúdo da resposta');
  });
});
