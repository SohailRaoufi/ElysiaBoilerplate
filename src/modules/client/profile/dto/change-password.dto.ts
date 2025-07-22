import { t } from 'elysia';

export const UserChangePasswordDto = t.Object({
  oldPass: t.String(),
  newPass: t.String({ minLength: 3 }),
});

export type UserChangePasswordDto = typeof UserChangePasswordDto.static;
