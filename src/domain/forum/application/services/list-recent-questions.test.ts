import { expect } from 'vitest';
import { QuestionsInMemoryRepository } from '../../../../../tests/repository/InMemory/questiosInMemory.repository.ts';
import { beforeEach, describe, it } from 'vitest';
import { makeQuestion } from '../../../../../tests/factory/make-question.ts';
import { ListRecentQuestions } from './list-recent-questions.ts';
import { QuestionAttachmentInMemoryRepository } from '../../../../../tests/repository/InMemory/questioAttachmentInMemoryRepository.ts';

let questionAttachmentsRepository: QuestionAttachmentInMemoryRepository;
let repository: QuestionsInMemoryRepository;
let sut: ListRecentQuestions;

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new QuestionAttachmentInMemoryRepository();
    repository = new QuestionsInMemoryRepository(questionAttachmentsRepository);
    sut = new ListRecentQuestions(repository);
  });

  it('should be able to list recent questions', async () => {
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }));
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }));
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }));

    const result = await sut.execute({
      page: 1,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it('should be able to repository paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(makeQuestion());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.questions).toHaveLength(2);
  });
});
