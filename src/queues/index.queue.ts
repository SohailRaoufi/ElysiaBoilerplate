import { Queue } from 'bullmq';
import { redis } from '@/config/redis';

export const emailQueue = new Queue('emailQueue', { connection: redis });
