import { requireAuth, validateRequest } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { TicketCreatePublisher } from '../events/publishers/ticket-created-publishers';
import { natsWrapper } from '../nats-wrapper';
import { newService } from '../services/new-service';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
    const result = await newService({
      title,
      price,
      userId: req.currentUser!.id,
    });

    new TicketCreatePublisher(natsWrapper.client).publish({
      id: result.id,
      title: result.title,
      price: result.price,
      userId: result.userId,
      version: result.version,
    });
    res.status(201).send(result);
  }
);

export { router as createTicketRouter };
