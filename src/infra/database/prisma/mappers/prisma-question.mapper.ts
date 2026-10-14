import { UniqueEntityId } from '@/core/entities/unique-entity-id.ts';
import { Question } from '@/domain/forum/enterprise/entities/question.ts';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.ts';
import { Question as QuestionPrisma } from '@/generated/prisma/client.ts';

export class PrismaQuestionMapper {
  static toDomain(raw: QuestionPrisma) {
    return Question.create(
      {
        authorId: UniqueEntityId.create(raw.authorId),
        title: raw.title,
        content: raw.content,
        bestAnswerId: undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        slug: Slug.create(raw.slug),
      },
      UniqueEntityId.create(raw.id),
    );
  }
}
