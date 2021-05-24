import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegistrationPageComponent } from './components/company-registration-page/company-registration-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../layout';
import { CompanyService } from './services/company.service';
import { SubscriptionPaymentComponent } from './components/subscription-payment/subscription-payment.component';
import { SubscriptionPlanService } from './services/subscription-plan.service';
import { SubscriptionService } from './services/subscription.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    CompanyRegistrationPageComponent,
    SubscriptionPaymentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [CompanyService, SubscriptionPlanService, SubscriptionService],
})
export class CompanyRegistrationModule {}
