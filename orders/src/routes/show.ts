import { requireAuth } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { showOrderService } from '../services/show-service';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await showOrderService(
      req.params.orderId,
      req.currentUser!.id,
      next
    );

    if (result) {
      res.status(200).send(result);
    }
  }
);

export { router as showOrderRouter };
