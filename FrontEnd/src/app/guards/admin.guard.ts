import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { IdentityService } from '../services/identity.service';
import { UserModel } from '../models/UserModel';
import { AccessDeniedReason } from '../access-denied/access-denied.component';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
      .then((user: UserModel) => user.isAdmin)
      .catch(() => {
        return false;
      })
      .then((isAdmin: boolean) => {
        if (!isAdmin) {
          this.router.navigate([
            '/accessdenied',
            AccessDeniedReason.Unauthorized,
          ]);
        }
        return isAdmin;
      });
  }
}
