import { emailHandler } from './email.consumer';

/**
 * QueueName: Hanlder that process the queue job
 */
export const handlers = {
  emailQueue: emailHandler,
};
