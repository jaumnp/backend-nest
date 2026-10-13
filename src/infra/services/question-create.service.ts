import {
  Injectable,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';
import { QuestionSchema } from '../http/controllers/create-question.controller.ts';
import { PrismaService } from '../database/prisma/prisma.service.ts';
import { transformSlug } from '../../utils/slug.ts';

@Injectable()
export class QuestionCreateService {
  constructor(private prisma: PrismaService) {}

  async execute({ authorId, title, content }: QuestionSchema) {
    if (!authorId) throw new UnauthorizedException('User not authenticated.');

    if (content.length > 2400)
      throw new PayloadTooLargeException('Content lengh too large.');

    const slug = transformSlug(title);

    const response = await this.prisma.question.create({
      data: {
        authorId,
        title,
        content,
        slug,
      },
    });

    return response;
  }
}
