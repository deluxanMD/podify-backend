import { RequestHandler } from 'express';

import { CreateUser } from '#/types/user';
import User from '#/models/user';
import { generateOTP } from '#/utils/helpers';
import { sendVerificationMail } from '#/utils/mail';

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  // Send verification email
  const otp = generateOTP();
  sendVerificationMail(otp, { name, email, userId: user._id.toString() });

  res.status(201).json({ user: { id: user._id, name, email } });
};
