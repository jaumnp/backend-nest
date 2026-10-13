import { expect, describe, beforeEach, it } from 'vitest';
import { QuestionCommentsInMemoryRepository } from '../../../../../tests/repository/InMemory/questionCommentInMemory.repository.ts';
import { QuestionsInMemoryRepository } from '../../../../../tests/repository/InMemory/questiosInMemory.repository.ts';
import { CommentOnQuestion } from './comment-on-questio.ts';
import { QuestionAttachmentInMemoryRepository } from '../../../../../tests/repository/InMemory/questioAttachmentInMemoryRepository.ts';
import { makeQuestion } from '../../../../../tests/factory/make-question.ts';

let questionAttachmentsRepository: QuestionAttachmentInMemoryRepository;
let questionRepository: QuestionsInMemoryRepository;
let questionCommentsRepository: QuestionCommentsInMemoryRepository;
let sut: CommentOnQuestion;

describe('Comment on Question', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new QuestionAttachmentInMemoryRepository();
    questionRepository = new QuestionsInMemoryRepository(
      questionAttachmentsRepository,
    );
    questionCommentsRepository = new QuestionCommentsInMemoryRepository();

    sut = new CommentOnQuestion(questionRepository, questionCommentsRepository);
  });

  it('should be able to comment on question', async () => {
    const question = makeQuestion();

    await questionRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    });

    expect(questionCommentsRepository.items[0]!.content).toEqual(
      'Comentário teste',
    );
  });
});
