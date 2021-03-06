import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services';
import { AuthForm } from 'src/app/models/LoginFormModel';
import { AuthResponse } from '../../../models/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public authResponse: AuthResponse;
  public isLoginUnSuccessfull: boolean;
  constructor(private _auth: AuthService, private _router: Router) {}

  public ngOnInit(): void {}

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
