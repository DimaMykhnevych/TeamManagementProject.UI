import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { UserInfoService } from '../auth/services';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  public isSigninLoading: boolean;
  constructor(
    private _userInfoService: UserInfoService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

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
