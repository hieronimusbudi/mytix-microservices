import jwt from 'jsonwebtoken';
import { BadRequestError } from '@hbsmytix/common';
import { Password } from '../utils/password';
import { User, UserAttrs } from '../models/user';
import { NextFunction } from 'express';

const signIn = async (user: UserAttrs, next: NextFunction) => {
  const existingUser = await User.findOne({
    email: user.email,
  });

  if (!existingUser) {
    next(new BadRequestError('Invalid credentials'));
    return null;
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    user.password
  );
  if (!passwordsMatch) {
    next(new BadRequestError('Invalid credentials'));
    return null;
  }

  // Generate JWT
  const userJWT = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );

  return { userJWT, existingUser };
};

export { signIn as signInService };
