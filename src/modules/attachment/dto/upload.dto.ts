import { t } from 'elysia';

export const UploadDto = t.Object({
  file: t.File(),
});

export type UploadDto = typeof UploadDto.static;
