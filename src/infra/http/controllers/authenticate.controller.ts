import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.ts';
import { AuthenticateServices } from '../../services/authenticate.service.ts';

const signInSchema = z.object({
  email: z.email('Invalid e-mail'),
  password: z.string('Invalid password'),
});

const signUpSchema = z.object({
  name: z.string('Invalid name'),
  email: z.email('Invalid e-mail'),
  password: z.string('Invalid password'),
});

type TSignInSchema = z.infer<typeof signInSchema>;
type TSignUpSchema = z.infer<typeof signUpSchema>;

@Controller('/account')
export class AuthenticateController {
  constructor(private services: AuthenticateServices) {}

  @Post('/signin')
  async signIn(@Body(new ZodValidationPipe(signInSchema)) body: TSignInSchema) {
    const response = await this.services.signIn(body);

    return { response };
  }

  @Post('/signup')
  async signUp(@Body(new ZodValidationPipe(signUpSchema)) body: TSignUpSchema) {
    const response = await this.services.signUp(body);

    return { response };
  }
}
