import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../layout';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AuthModule.forRoot(),
  ],
})
export class NativeLoginModule {}
