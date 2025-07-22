import { UserRole } from '@/database/src/generated/prisma';
import { t } from 'elysia';

export const UserProfileResponseDto = t.Object({
  id: t.String(),
  email: t.String(),
  username: t.String(),
  name: t.String(),
  role: t.Enum(UserRole),
  verifiedAt: t.Nullable(t.Date({ format: 'date-time' })),
  createdAt: t.Date({ format: 'date-time' }),
  updatedAt: t.Date({ format: 'date-time' }),
});

export const UserUpdateProfileDto = t.Object({
  name: t.String(),
});

export type UserUpdateProfileDto = typeof UserUpdateProfileDto.static;
