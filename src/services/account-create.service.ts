import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { hash } from 'bcrypt';

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

    const passwordHashed = await hash(password, 10);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });

    return { message: 'Success!' };
  }
}
