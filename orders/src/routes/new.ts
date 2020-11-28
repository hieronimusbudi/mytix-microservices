import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { natsWrapper } from '../nats-wrapper';
import { newService } from '../services/new-service';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { requireAuth, validateRequest } from '@hbsmytix/common';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;

    const result = await newService(ticketId, req.currentUser!.id, next);

    if (result) {
      const { order, ticket } = result;
      // Publish an event saying that an order was created
      new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
      });

      res.status(201).send(order);
    }
  }
);

export { router as newOrderRouter };
