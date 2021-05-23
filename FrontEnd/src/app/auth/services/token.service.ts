import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class TokenService {
  constructor(private cookieService: CookieService) {}

  public get token(): string {
    return localStorage.getItem('token') || (null as any);
  }

  public clearToken(): void {
    localStorage.removeItem('token');
  }
}
