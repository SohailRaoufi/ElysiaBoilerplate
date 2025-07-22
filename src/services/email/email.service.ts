import { mailerTransporter } from '@/config/nodemailer';

import { renderToStaticMarkup } from 'react-dom/server';
import { emailQueue } from '@/queues/index.queue';
import { getMinutesFromNow } from '@/common/utils/datetime';
import {
  EmailTemplatePropsMap,
  emailTemplates,
  EmailTemplateType,
} from './email-templates';
import React from 'react';

export interface EmailData<T extends EmailTemplateType = EmailTemplateType> {
  to: string;
  subject: string;
  template: T;
  templateProps: EmailTemplatePropsMap[T];
}

/**
 * Function used by worker to process queue job
 * @param EmailData
 */
export async function sendEmail({
  to,
  subject,
  template,
  templateProps,
}: EmailData) {
  try {
    const Component = emailTemplates[template];

    const html = renderToStaticMarkup(
      React.createElement(Component, templateProps)
    );

    const info = await mailerTransporter.sendMail({
      from: 'ibuki@gehenna.sh',
      to,
      subject,
      html,
    });

    console.log(`Email sent: ${info.messageId} to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function addEmailOtpJob(data: {
  to: string;
  code: string;
  expiresAt: Date;
}) {
  const { code, to, expiresAt } = data;
  const expiryMin = getMinutesFromNow(expiresAt);

  const emailData: EmailData = {
    to,
    subject: 'Verify Email',
    template: 'otp',
    templateProps: { otp: code, expiryMin },
  };

  await emailQueue.add('sendEmail', emailData);
}
