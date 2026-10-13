import { expect, describe, beforeEach, it } from 'vitest';
import { AnswerInMemoryRepository } from '../../../../../tests/repository/InMemory/answersInMemory.repository.ts';
import { makeAnswer } from '../../../../../tests/factory/make-answer.ts';
import { AnswerCommentInMemoryRepository } from '../../../../../tests/repository/InMemory/answerCommentInMemory.repository.ts';
import { CommentOnAnswer } from './comment-on-answer.ts';
import { AnswerAttachmentsInMemoryRepository } from '../../../../../tests/repository/InMemory/answerAttachementInMemory.repository.ts';

let answerAttachmentRepository: AnswerAttachmentsInMemoryRepository;
let answersRepository: AnswerInMemoryRepository;
let answerCommentsInMemoryRepository: AnswerCommentInMemoryRepository;
let sut: CommentOnAnswer;

describe('Comment on Answer', () => {
  beforeEach(() => {
    answerAttachmentRepository = new AnswerAttachmentsInMemoryRepository();
    answersRepository = new AnswerInMemoryRepository(
      answerAttachmentRepository,
    );
    answerCommentsInMemoryRepository = new AnswerCommentInMemoryRepository();

    sut = new CommentOnAnswer(
      answersRepository,
      answerCommentsInMemoryRepository,
    );
  });

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer();

    await answersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    });

    expect(answerCommentsInMemoryRepository.items[0]!.content).toEqual(
      'Comentário teste',
    );
  });
});
