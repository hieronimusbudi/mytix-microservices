import { BadRequestError, NotFoundError, OrderStatus } from '@hbsmytix/common';
import { NextFunction } from 'express';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';

const EXPIRATION_WINDOW_SECONDS = 1 * 60;
const newService = async (
  ticketId: string,
  userId: string,
  next: NextFunction
) => {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    next(new NotFoundError());
    return;
  }

  const isReserved = await ticket.isReserved();
  if (isReserved) {
    next(new BadRequestError('Ticket is already reserved'));
    return;
  }

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  const order = Order.build({
    userId,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  });

  await order.save();

  return { order, ticket };
};

export { newService };
