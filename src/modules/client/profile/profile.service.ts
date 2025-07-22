import { prisma } from '@/database/db';
import { UserUpdateProfileDto } from './dto/profile.dto';
import { UserChangePasswordDto } from './dto/change-password.dto';
import { User } from '@/database/src/generated/prisma';
import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { UnprocessableException } from '@/common/errors/unprocessable';

export async function UpdateProfile(
  payload: UserUpdateProfileDto,
  userId: string
) {
  const { name } = payload;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });
}

export async function ChangePassword(
  payload: UserChangePasswordDto,
  user: User
) {
  const { oldPass, newPass } = payload;

  if (!(await verifyPassword(oldPass, user.passwordHash))) {
    throw new UnprocessableException({
      message: 'Old Password is invalid',
      field: 'oldPass',
    }).toResponse();
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash: await hashPassword(newPass),
    },
  });
}
