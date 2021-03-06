import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const request = req.clone({
    //   headers: req.headers.set(
    //     'Authorization',
    //     `Bearer ${this._tokenService.token}`
    //   ),
    // });

    // return next.handle(request).pipe(
    //   catchError((error) => {
    //     this._handleError(error);

    //     return of(error);
    //   })
    // );
    return null;
  }

  private _handleError(err: HttpErrorResponse): void {
    if (err.status === 401) {
      this._authService.unauthorize();
      this._router.navigate([`/login`]);
    } else {
      throw err;
    }
  }
}
