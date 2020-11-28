import { validateRequest } from '@hbsmytix/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { signUpService } from '../services/signupService';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await signUpService({ email, password }, next);

    if (result) {
      // Store it on session object
      req.session = {
        jwt: result.userJWT,
      };

      res.status(201).send(result.newUser);
    }
  }
);

export { router as signUpRouter };
