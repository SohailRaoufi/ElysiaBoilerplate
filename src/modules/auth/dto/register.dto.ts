import { t } from 'elysia';

export const registerDto = t.Object({
  email: t.String({
    format: 'email',
    default: 'test@gmail.com',
  }),
  username: t.String({ default: 'ahmad' }),
  name: t.String({ default: 'ahmad' }),
  password: t.String({
    minLength: 3,
    default: '1234',
  }),
});

export type registerDto = typeof registerDto.static;
