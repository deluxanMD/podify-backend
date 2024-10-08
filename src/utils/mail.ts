import nodemailer from 'nodemailer';
import path from 'path';

import {
  MAILTRAP_PASSWORD,
  MAILTRAP_USER,
  MAILTRAP_VERIFICATION_EMAIL,
} from './variables';
import { generateOTP } from './helpers';
import EmailVerificationToken from '#/models/emailVerificationToken';
import { generateTemplate } from '#/mail/template';

interface Profile {
  name: string;
  email: string;
  userId: string;
}

const generateMailTransporter = () =>
  nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD,
    },
  });

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTransporter();

  const { name, email, userId } = profile;

  const welcomeMessage = `Hi ${name}, welcome to Podify! There are so much thing that we do for verified users. Use the given OTP to verify your email.`;

  const otp = generateOTP();
  await EmailVerificationToken.create({ owner: userId, token: otp });

  transport.sendMail({
    to: email,
    from: MAILTRAP_VERIFICATION_EMAIL,
    subject: 'OTP Verification',
    html: generateTemplate({
      title: 'Welcome to Podify',
      message: welcomeMessage,
      logo: 'cid:logo',
      banner: 'cid:welcome',
      link: '#',
      btnTitle: otp,
    }),
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../mail/logo.png'),
        cid: 'logo',
      },
      {
        filename: 'welcome.png',
        path: path.join(__dirname, '../mail/welcome.png'),
        cid: 'welcome',
      },
    ],
  });
};
