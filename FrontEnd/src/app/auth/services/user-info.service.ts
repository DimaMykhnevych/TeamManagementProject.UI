import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { IUserInfo } from '../../models/UserInfo';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../services';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserInfoService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private currentUserService: CurrentUserService
  ) {}

  public loadUserInfo(): Observable<IUserInfo> {
    if (!this.authService.isAuthenticated()) {
      return of(null as any);
    }

    const loadSubject = new ReplaySubject<IUserInfo>(1);

    this.httpClient
      .get(environment.apiRoutes.auth.userInfo)
      .subscribe((userInfo) => {
        this.currentUserService.userInfo = userInfo;
        loadSubject.next(userInfo);
        loadSubject.complete();
      });

    return loadSubject.asObservable();
  }
}
