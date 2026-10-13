import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TEnv } from '../env/index.ts';
import { JwtStrategy } from './jwt.strategy.ts';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<TEnv, true>) {
        const publicKey = config.get('JWT_PUBLIC', { infer: true });
        const privateKey = config.get('JWT_SECRET', { infer: true });

        return {
          signOptions: { algorithm: 'RS256' },
          publicKey: Buffer.from(publicKey, 'base64'),
          privateKey: Buffer.from(privateKey, 'base64'),
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
