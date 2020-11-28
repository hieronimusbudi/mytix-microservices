import { Order } from '../models/order';

const indexOrderService = async (userId: string) => {
  const orders = await Order.find({
    userId,
  }).populate('ticket');

  return orders;
};

export { indexOrderService };
