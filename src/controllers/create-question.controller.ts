import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from '../auth/user.decorator.js';
import type { JwtPayload } from '../auth/jwt.strategy.js';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.js';
import { QuestionCreateService } from '../services/question-create.service.js';

const questionSchema = z.object({
  authorId: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  slug: z.string().optional(),
});

export type QuestionSchema = z.infer<typeof questionSchema>;

@Controller('/questions')
export class AccountCreateController {
  constructor(private service: QuestionCreateService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async handler(
    @Body(new ZodValidationPipe(questionSchema))
    { title, content }: QuestionSchema,
    @UserPayload() user: JwtPayload,
  ) {
    const question = await this.service.execute({
      authorId: user.sub,
      title,
      content,
    });
    return { question };
  }
}
