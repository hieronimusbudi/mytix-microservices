import { Publisher, OrderCreatedEvent, Subjects } from '@hbsmytix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
