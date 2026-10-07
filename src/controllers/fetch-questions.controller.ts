import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import z from 'zod';
import { FetchQuestionsService } from '../services/fetch-questions.service.js';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.js';

const questionSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

export type QuestionSchema = z.infer<typeof questionSchema>;

@Controller('/questions')
export class AccountCreateController {
  constructor(private service: FetchQuestionsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async handler(
    @Query('page', new ZodValidationPipe(questionSchema)) page: QuestionSchema,
  ) {
    const question = await this.service.execute(page);
    return { question };
  }
}
