import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';

export const sendEmail = async ({ to, subject, html }) => {
  const transport = nodemailer.createTransport({
    host: getEnvVar('SMTP_HOST'),
    port: Number(getEnvVar('SMTP_PORT')),
    auth: {
      user: getEnvVar('SMTP_USER'),
      pass: getEnvVar('SMTP_PASSWORD'),
    },
  });

  await transport.sendMail({
    from: getEnvVar('SMTP_FROM'),
    to,
    subject,
    html,
  });
};