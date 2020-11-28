import { Subjects, Publisher, OrderCancelledEvent } from '@hbsmytix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
