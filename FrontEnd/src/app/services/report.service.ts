import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    public get() {
      return this.http.get(environment.apiRoutes.report.get, { withCredentials: true });
    }
}
