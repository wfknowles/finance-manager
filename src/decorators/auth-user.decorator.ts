import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export const AuthAccountId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const { user }: any = new JwtService().decode(
      request.headers.authorization.split(' ')[1],
    );

    return user?.accountId || null;
  },
);
