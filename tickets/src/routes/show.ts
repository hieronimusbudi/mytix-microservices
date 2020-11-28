import express, { NextFunction, Request, Response } from 'express';
import { showService } from '../services/show-service';

const router = express.Router();

router.get(
  '/api/tickets/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await showService(req.params.id, next);
    if (result) {
      res.send(result);
    }
  }
);

export { router as showTicketRouter };
