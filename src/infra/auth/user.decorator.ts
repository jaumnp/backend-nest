import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwt.strategy.ts';

export const UserPayload = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as JwtPayload;
  },
);
