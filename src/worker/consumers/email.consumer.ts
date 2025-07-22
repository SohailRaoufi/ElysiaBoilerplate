import { EmailData, sendEmail } from '@/services/email/email.service';
import { Job } from 'bullmq';

export const emailHandler = async (job: Job<EmailData>) => {
  await sendEmail(job.data);
};
