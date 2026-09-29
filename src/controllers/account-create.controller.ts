import { Body, Controller, Post } from '@nestjs/common';
import z from 'zod';
import { AccountCreateService } from '../services/account-create.service.js';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

@Controller('/account')
export class AccountCreateController {
  constructor(private service: AccountCreateService) {}

  @Post('/create')
  handler(@Body() body: IUserCreate) {
    const response = this.service.handler(body) as object;

    return response;
  }
}
