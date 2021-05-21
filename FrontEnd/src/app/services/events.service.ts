import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EventModel } from '../models/EventModel';
import { Poll } from '../models/Poll';
import { ChangeAttending } from './../models/ChangeAttendingModel';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
    constructor(private http: HttpClient) {}

    public create(event: EventModel) {
      return this.http.post(environment.apiRoutes.event.post, event, { withCredentials: true });
    }

    public get() {
      return this.http.get(environment.apiRoutes.event.get, { withCredentials: true });
    }

    public changeAttending(eventId: string, status: string){
      let chModel = new ChangeAttending(eventId, status);
      return this.http.put(environment.apiRoutes.event.changeAttending, chModel, { withCredentials: true });
    }
}
