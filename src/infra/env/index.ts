import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_PUBLIC: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

export type TEnv = z.infer<typeof envSchema>;
