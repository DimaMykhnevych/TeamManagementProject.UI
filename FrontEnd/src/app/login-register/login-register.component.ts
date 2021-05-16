import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  public loginUrl: string;
  public registerUrl: string;

  constructor(private identityService: IdentityService) { }

  ngOnInit(): void {
    [this.loginUrl, this.registerUrl] = [
      this.identityService.getLoginUrl(),
      this.identityService.getRegisterUrl()
    ];
  }
}
