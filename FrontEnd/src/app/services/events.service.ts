import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
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

    public get(date: Date) {
      let dat = (moment(date)).format('DD-MMM-YYYY HH:mm:ss');
      return this.http.get(environment.apiRoutes.event.get + `?date=${dat}`, { withCredentials: true });
    }

    public changeAttending(eventId: string, status: string){
      let chModel = new ChangeAttending(eventId, status);
      return this.http.put(environment.apiRoutes.event.changeAttending, chModel, { withCredentials: true });
    }

    public delete(eventId){
      return this.http.delete(environment.apiRoutes.event.delete + `?id=${eventId}`, { withCredentials: true })
    }
}
