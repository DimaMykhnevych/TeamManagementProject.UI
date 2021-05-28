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

    public delete(pollId){
      return this.http.delete(environment.apiRoutes.polls.delete + `?id=${pollId}`, { withCredentials: true })
    }

    public put(poll){
      return this.http.put(environment.apiRoutes.polls.put, poll, { withCredentials: true })
    }

    public getById(pollId){
      return this.http.get(environment.apiRoutes.polls.getById + `?id=${pollId}`, { withCredentials: true })
    }
}
