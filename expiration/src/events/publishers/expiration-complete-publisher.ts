import { Subjects, Publisher, ExpirationCompleteEvent } from '@hbsmytix/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
