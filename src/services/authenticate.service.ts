import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { compare, hash } from 'bcrypt';
import z from 'zod';

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

@Injectable()
export class AuthenticateServices {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn({ email, password }: TSignInSchema) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPassValid = await compare(password, user.password);

    if (!isPassValid) throw new UnauthorizedException('Invalid credentials');

    return this.jwt.sign({ sub: user.id });
  }

  async signUp({ name, email, password }: TSignUpSchema) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ConflictException('User alerady exists');

    const hashedPass = await hash(password, 10);

    const response = await this.prisma.user.create({
      data: { name, email, password: hashedPass },
    });

    return this.jwt.sign({ sub: response.id });
  }
}
