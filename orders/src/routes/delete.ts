import { requireAuth } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { deleteOrderService } from '../services/delete-service';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteOrderService(
      req.params.orderId,
      req.currentUser!.id,
      next
    );

    if (result) {
      // publishing an event saying this was cancelled!
      new OrderCancelledPublisher(natsWrapper.client).publish({
        id: result.id,
        version: result.version,
        ticket: {
          id: result.ticket.id,
        },
      });

      res.status(204).send(result);
    }
  }
);

export { router as deleteOrderRouter };
