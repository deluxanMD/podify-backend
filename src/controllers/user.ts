import { RequestHandler } from 'express';

import { CreateUser } from '#/types/user';
import User from '#/models/user';

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json(user);
};
