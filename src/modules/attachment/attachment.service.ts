import { S3BucketService } from '@/services/s3-bucket/s3.service';
import { UploadDto } from './dto/upload.dto';
import { prisma } from '@/database/db';

const s3 = new S3BucketService();

export async function upload(payload: UploadDto) {
  const { file } = payload;

  const {
    originalMetadata: { url, key },
  } = await s3.Upload(file as any);

  const attachment = await prisma.attachments.create({
    data: {
      url,
      key,
    },
  });

  return attachment;
}
