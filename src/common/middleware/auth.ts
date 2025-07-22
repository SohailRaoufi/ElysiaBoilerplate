import { verifyToken } from '@/common/utils/jwt';
import { prisma } from '@/database/db';
import { Elysia } from 'elysia';

export const AuthPlugin = (app: Elysia) =>
  app.derive(async ({ headers, set }) => {
    const authHeader = headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      set.status = 401;
      throw new Error('Unauthorized: Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);

    if (!user) {
      set.status = 401;
      throw new Error('Unauthorized: Invalid or expired token');
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: user.sub as string,
      },
    });

    if (!userExists) {
      set.status = 401;
      throw new Error('Unauthorized: Invalid or expired token');
    }

    return {
      user: userExists,
    };
  });
