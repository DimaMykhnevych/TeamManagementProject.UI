import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from '../services/identity.service';
import { AccessDeniedReason } from '../access-denied/access-denied.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private identityService: IdentityService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.identityService
      .getUser()
      .toPromise()
      .then(() => true)
      .catch(() => {
        this.router.navigate([
          '/accessdenied',
          AccessDeniedReason.Unauthenticated,
        ]);
        return false;
      });
  }
}
