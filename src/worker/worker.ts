import { Worker } from 'bullmq';
import { redis } from '@/config/redis';
import { handlers } from './consumers';

export const workers: Worker[] = [];

for (const [queueName, handler] of Object.entries(handlers)) {
  const worker = new Worker(queueName, handler, { connection: redis });

  worker.on('completed', (job) => {
    console.log(`${queueName} job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`${queueName} job ${job?.id} failed`, err.message);
  });

  workers.push(worker);
  console.log(`Worker registered: ${queueName}`);
}
