import { prisma } from '@/database/db';
import { loginDto, loginResponseDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { signToken } from '@/common/utils/jwt';
import { UnprocessableException } from '@/common/errors/unprocessable';
import { NotFoundError } from 'elysia';
import { addEmailOtpJob } from '@/services/email/email.service';
import { getFutureTime } from '@/common/utils/datetime';
import {
  User,
  UserRole,
  UserSecurityActionType,
} from '@/database/src/generated/prisma';
import { generateRandomNumber } from '@/common/utils/utils';
import { resendOtpDto, verifyOtpDto } from './dto/verify-otp.dto';
import {
  confirmResetPasswordDto,
  initiateResetPasswordDto,
} from './dto/forgot-password';

export async function login(payload: loginDto): Promise<loginResponseDto> {
  const { email, password } = payload;

  const user = await findUserByEmail(email);

  if (!user.verifiedAt) {
    throw new UnprocessableException({
      message: 'user not verified',
      field: 'verify',
    }).toResponse();
  }

  if (!(await verifyPassword(password, user.passwordHash))) {
    throw new UnprocessableException({
      message: 'invalid credentails',
      field: 'password',
    }).toResponse();
  }

  const token = signToken({ sub: user.id, role: user.role });

  return {
    token,
  };
}

export async function register(payload: registerDto) {
  const { username, email, password, name } = payload;

  await validateUserUniqueness(email, username);

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      username,
      passwordHash,
      email,
    },
  });

  const otpCode = generateRandomNumber(6);

  const securityAction = await prisma.userSecurityAction.create({
    data: {
      userId: user.id,
      secret: otpCode,
      type: UserSecurityActionType.OTP,
      expiresAt: getFutureTime(15),
    },
  });

  await addEmailOtpJob({
    to: email,
    code: securityAction.secret,
    expiresAt: securityAction.expiresAt,
  });

  return {
    code: securityAction.secret,
  };
}

export async function verifyOtp(
  payload: verifyOtpDto
): Promise<loginResponseDto> {
  const { code, email } = payload;

  const user = await findUserByEmail(email);

  if (user.verifiedAt) {
    throw new UnprocessableException({
      message: 'user already verified',
      field: 'user',
    });
  }

  const security = await prisma.userSecurityAction.findFirst({
    where: {
      user: user,
      secret: code,
      expiresAt: { gte: new Date() },
      usedAt: null,
      type: UserSecurityActionType.OTP,
    },
  });

  if (!security) {
    throw new NotFoundError('Invalid code or expired');
  }

  await prisma.userSecurityAction.update({
    where: {
      id: security.id,
    },
    data: {
      usedAt: new Date(),
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verifiedAt: new Date(),
    },
  });

  const token = signToken({ sub: user.id, role: user.role });

  return {
    token,
  };
}

export async function resendOtp(payload: resendOtpDto) {
  const { email } = payload;

  const user = await findUserByEmail(email);

  if (user.verifiedAt) {
    throw new UnprocessableException({
      message: 'Dude what is wrong with you',
      field: 'email',
    }).toResponse();
  }

  const security = await prisma.userSecurityAction.findFirst({
    where: {
      user: user,
      expiresAt: { gte: new Date() },
      usedAt: null,
      type: UserSecurityActionType.OTP,
    },
  });

  if (security) {
    await prisma.userSecurityAction.delete({
      where: {
        id: security.id,
      },
    });
  }

  const otpCode = generateRandomNumber(6);

  const securityAction = await prisma.userSecurityAction.create({
    data: {
      userId: user.id,
      secret: otpCode,
      type: UserSecurityActionType.OTP,
      expiresAt: getFutureTime(15),
    },
  });

  await addEmailOtpJob({
    to: email,
    code: securityAction.secret,
    expiresAt: securityAction.expiresAt,
  });
}

export async function initiateResetPassword(payload: initiateResetPasswordDto) {
  const { email } = payload;

  const user = await findUserByEmail(email);

  const security = await prisma.userSecurityAction.findFirst({
    where: {
      user: user,
      expiresAt: { gte: new Date() },
      usedAt: null,
      type: UserSecurityActionType.FORGOT_PASSWORD,
    },
  });

  if (security) {
    await prisma.userSecurityAction.delete({
      where: {
        id: security.id,
      },
    });
  }

  const otpCode = generateRandomNumber(6);

  const securityAction = await prisma.userSecurityAction.create({
    data: {
      userId: user.id,
      secret: otpCode,
      type: UserSecurityActionType.FORGOT_PASSWORD,
      expiresAt: getFutureTime(15),
    },
  });

  // TODO: add a template for reset password
  await addEmailOtpJob({
    to: email,
    code: securityAction.secret,
    expiresAt: securityAction.expiresAt,
  });

  return {
    code: securityAction.secret,
  };
}

export async function confirmResetPassword(payload: confirmResetPasswordDto) {
  const { code, password, email } = payload;

  const user = await findUserByEmail(email);

  const security = await prisma.userSecurityAction.findFirst({
    where: {
      user: user,
      secret: code,
      expiresAt: { gte: new Date() },
      usedAt: null,
      type: UserSecurityActionType.FORGOT_PASSWORD,
    },
  });

  if (!security) {
    throw new NotFoundError('invalid code or expired');
  }

  await prisma.userSecurityAction.update({
    where: {
      id: security.id,
    },
    data: {
      usedAt: new Date(),
    },
  });

  const passwordHash = await hashPassword(password);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
    },
  });
}

/**
 * ----------------------------
 * Helper Methods
 * ----------------------------
 */

async function validateUserUniqueness(email: string, username: string) {
  const [emailUser, usernameUser] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { username } }),
  ]);

  const errors = [];

  if (emailUser) {
    errors.push({ field: 'email', message: 'Email already exists' });
  }

  if (usernameUser) {
    errors.push({ field: 'username', message: 'Username already exists' });
  }

  if (errors.length > 0) {
    throw new UnprocessableException(errors).toResponse();
  }
}

async function findUserByEmail(email: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundError('user not found');
  }

  return user;
}
