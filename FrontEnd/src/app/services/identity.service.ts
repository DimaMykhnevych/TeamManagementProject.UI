import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient) {}

  public getRegisterUrl(): string {
    const requestUrl = environment.apiRoutes.identity.register;
    // const returnUrl = `${window.location.origin}/home`;
    const returnUrl =
      'https://dimamykhnevych.github.io/TeamManagementProject.UI/home';
    return `${requestUrl}?returnUrl=${returnUrl}`;
  }

  public getLoginUrl(): string {
    const requestUrl = environment.apiRoutes.identity.login;
    // const returnUrl = `${window.location.origin}/home`;
    const returnUrl =
      'https://dimamykhnevych.github.io/TeamManagementProject.UI/home';
    return `${requestUrl}?returnUrl=${returnUrl}`;
  }

  public getUser() {
    return this.http.get(environment.apiRoutes.identity.getUser, {
      withCredentials: true,
    });
  }

  public getUsers() {
    return this.http.get(environment.apiRoutes.identity.getUsers, {
      withCredentials: true,
    });
  }

  public makeAdmin(idParameter: string) {
    return this.http.put(
      environment.apiRoutes.identity.makeAdmin + `/${idParameter}`,
      {},
      { withCredentials: true }
    );
  }

  getTeamMembers() {
    return this.http.get(environment.apiRoutes.identity.getTeam, {
      withCredentials: true,
    });
  }
}
