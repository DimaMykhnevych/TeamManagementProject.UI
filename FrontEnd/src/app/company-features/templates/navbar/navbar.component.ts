import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserInfoService } from 'src/app/auth/services';
import { IUserInfo } from 'src/app/models/UserInfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public userInfo: IUserInfo;
  constructor(
    private _userInfoService: UserInfoService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._userInfoService.loadUserInfo().subscribe((resp) => {
      if (resp) {
        this.userInfo = resp;
      }
    });
  }

  public onLogOutButtonCLick(): void {
    this._authService.unauthorize();
    this._router.navigate(['']);
  }
}
