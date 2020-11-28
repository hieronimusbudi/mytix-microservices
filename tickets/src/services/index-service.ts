import { Ticket } from '../models/ticket';

const index = async () => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  return tickets;
};

export { index as indexService };
