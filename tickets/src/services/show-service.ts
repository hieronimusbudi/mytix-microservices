import { NextFunction } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@hbsmytix/common';

const show = async (id: string, next: NextFunction) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    next(new NotFoundError());
    return;
  }

  return ticket;
};

export { show as showService };
