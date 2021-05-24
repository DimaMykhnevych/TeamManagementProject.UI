import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamProject } from 'src/app/models/TeamProject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamProjectService {
  constructor(private _http: HttpClient) {}

  public createTeamProject(teamProject: TeamProject): Observable<TeamProject> {
    return this._http.post<TeamProject>(
      environment.apiRoutes.teamProject.post,
      teamProject,
      {
        withCredentials: true,
      }
    );
  }
}
