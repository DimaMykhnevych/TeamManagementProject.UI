import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services';
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
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _identityService: IdentityService
  ) {}

  public ngOnInit(): void {
    this._identityService.getUser().subscribe((resp) => {
      console.log(resp);
    });
    // if (this._auth.isAuthenticated()) {
    //   this._router.navigate(['/company-features/register-employee']);
    // }
  }

  public login(value: AuthForm): void {
    this._auth.authorize(value).subscribe((authResponse: AuthResponse) => {
      if (authResponse.isAuthorized) {
        this._router.navigate(['/company-features/register-employee']);
      } else {
        this.authResponse = authResponse;
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
