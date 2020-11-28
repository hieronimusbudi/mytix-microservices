import { requireAuth } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { indexOrderService } from '../services/index-service';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await indexOrderService(req.currentUser!.id);

    if (result) {
      res.status(200).send(result);
    }
  }
);

export { router as indexOrderRouter };
