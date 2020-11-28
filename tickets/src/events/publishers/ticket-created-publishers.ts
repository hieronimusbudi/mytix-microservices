import { Publisher, Subjects, TicketCreatedEvent } from '@hbsmytix/common';

export class TicketCreatePublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
