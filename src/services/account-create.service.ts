import { ConflictException, Injectable } from '@nestjs/common';
import { string } from 'zod';
import { PrismaService } from '../prisma/prisma.service.js';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class AccountCreateService {
  constructor(private prisma: PrismaService) {}
  async handler({ name, email, password }: IUserCreate) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) throw new ConflictException('User already exists!');

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return { message: 'Success!' };
  }
}
