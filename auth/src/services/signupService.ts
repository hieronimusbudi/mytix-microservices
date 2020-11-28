import jwt from 'jsonwebtoken';
import { BadRequestError } from '@hbsmytix/common';
import { User, UserAttrs } from '../models/user';
import { NextFunction } from 'express';

const signUp = async (user: UserAttrs, next: NextFunction) => {
  const existingUser = await User.findOne({
    email: user.email,
  });

  if (existingUser) {
    next(new BadRequestError('Email in use'));
    return null;
  }

  const newUser = User.build({
    email: user.email,
    password: user.password,
  });
  await newUser.save();

  // Generate JWT
  const userJWT = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    },
    process.env.JWT_KEY!
  );

  return { userJWT, newUser };
};

export { signUp as signUpService };
