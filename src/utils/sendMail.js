import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';

export const sendEmail = async ({ from, to, subject, html }) => {
  const transport = nodemailer.createTransport({
    host: getEnvVar('SMTP_HOST'),
    port: Number(getEnvVar('SMTP_PORT')),
    auth: {
      user: getEnvVar('SMTP_USER'),
      pass: getEnvVar('SMTP_PASSWORD'),
    },
  });

  return transport.sendMail({
    from,
    to,
    subject,
    html,
  });
};