import { requireAuth, validateRequest } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { editService } from '../services/edit-service';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    const result = await editService(
      { title, price, userId: req.currentUser!.id },
      req.params.id,
      next
    );

    if (result) {
      res.status(200).send(result);
    }
  }
);

export { router as updateTicketRouter };
