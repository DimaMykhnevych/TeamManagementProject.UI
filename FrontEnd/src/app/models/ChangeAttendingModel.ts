export class ChangeAttending {
  constructor(eventId: string, status: string) {
    this.id = eventId;
    this.status = status;
  }
  id: string;
  status: string;
}
