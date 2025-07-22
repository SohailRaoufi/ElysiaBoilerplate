import { t } from 'elysia';

export const loginDto = t.Object({
  email: t.String({
    format: 'email',
    default: 'test@gmail.com',
  }),
  password: t.String({
    minLength: 3,
    default: '1234',
  }),
});

export type loginDto = typeof loginDto.static;

export const loginResponseDto = t.Object({
  token: t.String(),
});

export type loginResponseDto = typeof loginResponseDto.static;
