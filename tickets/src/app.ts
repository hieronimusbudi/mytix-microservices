import cookieSession from 'cookie-session';
import express from 'express';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@hbsmytix/common';
import { createTicketRouter } from './routes/new';
import { indexTicketRouter } from './routes';
import { showTicketRouter } from './routes/show';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(showTicketRouter);
app.use(createTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
  return;
});
app.use(errorHandler);

export { app };
