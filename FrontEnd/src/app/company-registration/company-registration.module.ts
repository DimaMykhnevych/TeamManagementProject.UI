import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegistrationPageComponent } from './components/company-registration-page/company-registration-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompanyRegistrationPageComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class CompanyRegistrationModule {}
