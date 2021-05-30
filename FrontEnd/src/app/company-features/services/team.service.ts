import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/Team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private _http: HttpClient) {}

  public createTeam(team: Team): Observable<Team> {
    return this._http.post<Team>(environment.apiRoutes.team.post, team, {
      withCredentials: true,
    });
  }

  public getTeams(): Observable<Team[]> {
    return this._http.get<Team[]>(environment.apiRoutes.team.get, {
      withCredentials: true,
    });
  }

  public getById(id: string): Observable<Team> {
    return this._http.get<Team>(
      environment.apiRoutes.team.getById + '?id=' + id,
      {
        withCredentials: true,
      }
    );
  }

  public update(team: Team): Observable<Team> {
    return this._http.put<Team>(environment.apiRoutes.team.post, team, {
      withCredentials: true,
    });
  }
}
