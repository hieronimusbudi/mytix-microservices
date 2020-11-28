import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '@hbsmytix/common';
import { NextFunction } from 'express';
import { Ticket, TicketAttrs } from '../models/ticket';

const editService = async (
  ticket: TicketAttrs,
  id: string,
  next: NextFunction
) => {
  const currentTicket = await Ticket.findById(id);

  if (!currentTicket) {
    next(new NotFoundError());
    return;
  }

  if (currentTicket.orderId) {
    next(new BadRequestError('Cannot edit a reserved ticket'));
    return;
  }

  if (currentTicket.userId !== ticket.userId) {
    next(new NotAuthorizedError());
    return;
  }

  currentTicket.set({
    title: ticket.title,
    price: ticket.price,
  });

  await currentTicket.save();
  return currentTicket;
};

export { editService };
