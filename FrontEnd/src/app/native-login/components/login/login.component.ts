import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserInfoService } from 'src/app/auth/services';
import { AuthForm } from 'src/app/models/LoginFormModel';
import { IdentityService } from 'src/app/services/identity.service';
import { AuthResponse } from '../../../models/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public authResponse: AuthResponse;
  public isLoginUnSuccessfull: boolean;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _userInfoService: UserInfoService
  ) {}

  public ngOnInit(): void {
    this._userInfoService.loadUserInfo().subscribe((resp) => {
      if (resp) {
        this._router.navigate(['/company-features/register-employee']);
      }
    });
  }

  public login(value: AuthForm): void {
    this._auth.authorize(value).subscribe((authResponse) => {
      if (authResponse.succeeded) {
        this._router.navigate(['/company-features/register-employee']);
      } else {
        this.isLoginUnSuccessfull = true;
      }
    });
  }

  public register(): void {
    this._router.navigate(['/register']);
  }

  public onBackToHomeClick(): void {
    this._router.navigate(['']);
  }
}
