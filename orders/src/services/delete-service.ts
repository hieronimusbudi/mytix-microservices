import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@hbsmytix/common';
import { NextFunction } from 'express';
import { Order } from '../models/order';

const deleteOrderService = async (
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

  order.status = OrderStatus.Cancelled;
  await order.save();

  return order;
};

export { deleteOrderService };
