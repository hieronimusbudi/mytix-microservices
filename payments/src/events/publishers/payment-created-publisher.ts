import { Subjects, Publisher, PaymentCreatedEvent } from '@hbsmytix/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
