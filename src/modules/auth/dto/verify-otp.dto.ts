import { t } from 'elysia';

export const verifyOtpDto = t.Object({
  email: t.String({
    format: 'email',
    default: 'test@gmail.com',
  }),
  code: t.String({
    default: '12345',
  }),
});

export type verifyOtpDto = typeof verifyOtpDto.static;

export const resendOtpDto = t.Object({
  email: t.String({
    format: 'email',
    default: 'test@gmail.com',
  }),
});

export type resendOtpDto = typeof resendOtpDto.static;
