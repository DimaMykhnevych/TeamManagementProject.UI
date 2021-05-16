import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegistrationPageComponent } from './components/company-registration-page/company-registration-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../layout';
import { CompanyService } from './services/company.service';
import { SubscriptionPaymentComponent } from './components/subscription-payment/subscription-payment.component';

@NgModule({
  declarations: [CompanyRegistrationPageComponent, SubscriptionPaymentComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  providers: [CompanyService],
})
export class CompanyRegistrationModule {}
