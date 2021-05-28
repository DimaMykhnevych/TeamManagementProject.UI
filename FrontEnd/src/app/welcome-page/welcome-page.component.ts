import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CurrentUserService, UserInfoService } from '../auth/services';
import { UserModel } from '../models/UserModel';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  public isSigninLoading: boolean;
  public loginUrl: string;
  public isUserNull: boolean;
  constructor(
    private _userInfoService: UserInfoService,
    private _router: Router,
    private identityService: IdentityService
  ) {}

  ngOnInit(): void {
    [this.loginUrl] = [
      this.identityService.getLoginUrl()
    ];
    this._userInfoService
      .loadUserInfo()
      .pipe(catchError(async (err) => console.log('error')))
      .subscribe(
        (resp) => {
          if (resp && resp.id) {
            this.isUserNull = false;
          } else {
            this.isUserNull = true;
          }
        },
        (err) => {
          console.log('error!!!!!');
          this.isUserNull = true;
        }
      );
  }

  public onSignInClick(): void {
    this.isSigninLoading = true;
    this._userInfoService
      .loadUserInfo()
      .pipe(catchError(async (err) => console.log('error')))
      .subscribe(
        (resp) => {
          if (resp && resp.id) {
            this._router.navigate(['/company-features/register-employee']);
          } else {
            this._router.navigate(['login']);
          }
          this.isSigninLoading = false;
        },
        (err) => {
          console.log('error!!!!!');
        }
      );
  }
}
