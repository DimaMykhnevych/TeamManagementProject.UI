import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserService } from '../services';
import { IUserInfo } from '../../models/UserInfo';
import { AuthForm } from '../../models/LoginFormModel';
import { AuthResponse } from '../../models/AuthResponse';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _currentUserService: CurrentUserService
  ) {}

  public isAuthenticated(): boolean {
    return !!this._tokenService.token;
  }

  public authorize(form: AuthForm): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(environment.apiRoutes.auth.login, form, {
        withCredentials: true,
      })
      .pipe(
        map((response: AuthResponse) => {
          if (!response.isAuthorized) {
            return response;
          }
          this._currentUserService.userInfo = response.userInfo;

          return response;
        })
      );
  }

  public unauthorize(): void {
    this._http
      .get(environment.apiRoutes.auth.logout, {
        withCredentials: true,
      })
      .subscribe((_) => {});
    this._currentUserService.userInfo = null;
  }
}
