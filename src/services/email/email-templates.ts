import OTPEmail, { OtpEmailProps } from '@/../templates/emails/otp';
import React from 'react';

export type EmailTemplateType = 'otp';

interface EmailTemplateProps {
  otp: OtpEmailProps;
}

export const emailTemplates: {
  [T in EmailTemplateType]: React.FC<EmailTemplateProps[T]>;
} = {
  otp: OTPEmail,
};

export type EmailTemplatePropsMap = EmailTemplateProps;
