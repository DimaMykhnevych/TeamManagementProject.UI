import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { AuthService, CurrentUserService, TokenService } from './services';
import { NativeAuthGuard } from './guards';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserInfoService } from './services/user-info.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        TokenService,
        NativeAuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        UserInfoService,
        CurrentUserService,
      ],
    };
  }
}
