import { AuthPlugin } from '@/common/middleware/auth';
import { AttachmentsPlain } from '@/database/src/generated/prismabox/Attachments';
import Elysia from 'elysia';
import { upload } from './attachment.service';
import { UploadDto } from './dto/upload.dto';

export const attachmentRoutes = new Elysia({
  tags: ['attachment'],
})
  .use(AuthPlugin)
  .group('/attachment', (app) =>
    app

      /**
       * ---------------------------------------
       * Upload Attachment
       * ---------------------------------------
       */

      .post('', async ({ body }) => upload(body), {
        body: UploadDto,
        response: {
          201: AttachmentsPlain,
        },
        detail: {
          summary: 'Upload',
        },
      })
  );
