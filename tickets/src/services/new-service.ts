import { Ticket, TicketAttrs } from '../models/ticket';

const newService = async (ticket: TicketAttrs) => {
  const newTicket = Ticket.build({
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });
  await newTicket.save();
  return newTicket;
};

export { newService };
