import express, { Request, Response } from 'express';
import { indexService } from '../services/index-service';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const result = await indexService();
  res.send(result);
});

export { router as indexTicketRouter };
