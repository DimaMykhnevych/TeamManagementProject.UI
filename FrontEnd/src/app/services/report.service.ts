import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { EventModel } from '../models/EventModel';
import { Report } from '../models/Report';
import { ChangeAttending } from './../models/ChangeAttendingModel';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
    constructor(private http: HttpClient) {}

    public create(report: Report) {
      return this.http.post(environment.apiRoutes.report.post, report, { withCredentials: true });
    }

    public get(date: Date) {
      let dat = (moment(date)).format('DD-MMM-YYYY HH:mm:ss');
      return this.http.get(environment.apiRoutes.report.get + `?date=${dat}`, { withCredentials: true });
    }
}
