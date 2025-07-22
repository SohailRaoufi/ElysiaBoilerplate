import { t } from 'elysia';

export const confirmResetPasswordDto = t.Object({
  password: t.String({
    default: 'Ahmad@123',
  }),
  code: t.String({
    default: '12345',
  }),
  email: t.String({
    format: 'email',
    default: 'test@gmail.com',
  }),
});

export type confirmResetPasswordDto = typeof confirmResetPasswordDto.static;

export const initiateResetPasswordDto = t.Object({
  email: t.String({
    format: 'email',
    default: 'test@gmail.com',
  }),
});

export type initiateResetPasswordDto = typeof initiateResetPasswordDto.static;
