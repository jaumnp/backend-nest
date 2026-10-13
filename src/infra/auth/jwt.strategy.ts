import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TEnv } from '../env/index.ts';
import z from 'zod';

const jwtSchema = z.object({
  sub: z.uuid(),
});

export type JwtPayload = z.infer<typeof jwtSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<TEnv, true>) {
    const publicKey = config.get('JWT_PUBLIC', { infer: true });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload) {
    return jwtSchema.parse(payload);
  }
}
