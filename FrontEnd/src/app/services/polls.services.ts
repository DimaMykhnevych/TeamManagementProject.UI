import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Poll } from '../models/Poll';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
    constructor(private http: HttpClient) {}

    public create(poll: Poll) {
      return this.http.post(environment.apiRoutes.polls.post, poll, { withCredentials: true });
    }

    public get() {
      return this.http.get(environment.apiRoutes.polls.get, { withCredentials: true });
    }

    public makeVote(pollId: string, optionId: string) {
      return this.http.post(environment.apiRoutes.polls.makeVote, {pollId: pollId, optionId: optionId}, { withCredentials: true } );
    }
}
