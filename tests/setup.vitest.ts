import { PrismaClient } from '@/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { execSync } from 'child_process';
import { randomUUIDv7 } from 'crypto';
import 'dotenv/config';

const uuid = randomUUIDv7();

let prisma: PrismaClient;

function generateUniqueDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL Invalid!');

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

if (process.env.DATABASE_URL) {
  beforeAll(async () => {
    const url = generateUniqueDataBaseURL(uuid);

    process.env.DATABASE_URL = url;

    prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    });

    execSync(`npx prisma migrate deploy`);
  });

  afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${uuid} CASCADE`);
    await prisma.$disconnect();
  });
}
