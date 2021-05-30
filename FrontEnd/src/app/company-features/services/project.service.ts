import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectCreateModel } from '../../models/ProjectCreateModel';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/models/Project';
import { ProjectUpdateModel } from '../../models/ProjectUpdateModel';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _http: HttpClient) {}

  public createProject(
    project: ProjectCreateModel
  ): Observable<ProjectCreateModel> {
    return this._http.post<ProjectCreateModel>(
      environment.apiRoutes.project.post,
      project,
      { withCredentials: true }
    );
  }

  public getProjects(): Observable<Project[]> {
    return this._http.get<Project[]>(environment.apiRoutes.project.get, {
      withCredentials: true,
    });
  }

  public getAllProjects(): Observable<Project[]> {
    return this._http.get<Project[]>(
      environment.apiRoutes.project.allProjects,
      {
        withCredentials: true,
      }
    );
  }

  public updateProject(project: ProjectUpdateModel): Observable<Project> {
    return this._http.put<Project>(
      environment.apiRoutes.project.update,
      project,
      { withCredentials: true }
    );
  }

  public deleteProject(id: string): Observable<boolean> {
    return this._http.delete<boolean>(
      `${environment.apiRoutes.project.delete}/${id}`,
      { withCredentials: true }
    );
  }
}
