import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import 'express-async-errors';
import { currentUserRouter } from './routes/currentUser';
import { CustomError, errorHandler, NotFoundError } from '@hbsmytix/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
  return;
});
app.use(errorHandler);

export { app };
