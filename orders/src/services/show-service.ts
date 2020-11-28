import { NotAuthorizedError, NotFoundError } from '@hbsmytix/common';
import { NextFunction } from 'express';
import { Order } from '../models/order';

const showOrderService = async (
  orderId: string,
  userId: string,
  next: NextFunction
) => {
  const order = await Order.findById(orderId).populate('ticket');

  if (!order) {
    next(new NotFoundError());
    return;
  }
  if (order.userId !== userId) {
    next(new NotAuthorizedError());
    return;
  }

  return order;
};

export { showOrderService };
