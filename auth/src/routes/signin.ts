import { validateRequest } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { signInService } from '../services/signinService';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const result = await signInService(
      {
        email,
        password,
      },
      next
    );

    if (result) {
      // Store it on session object
      req.session = {
        jwt: result.userJWT,
      };

      res.status(200).send(result.existingUser);
    }
  }
);

export { router as signInRouter };
