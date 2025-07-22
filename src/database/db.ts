import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') {
  (global as any).prisma = prisma;
}

export { prisma };
