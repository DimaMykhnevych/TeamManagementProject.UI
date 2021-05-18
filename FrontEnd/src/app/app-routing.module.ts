import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowToArticlesListComponent } from './how-to-articles-list/how-to-articles-list.component';
import { AdminComponent } from './admin/admin.component';
import { ArticleComponent } from './article/article.component';
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { ArticleEditComponent } from './article-creation/article-edit.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthorizedMainComponent } from './authorized-main/authorized-main.component';
import { CompanyRegistrationPageComponent } from './company-registration/components/company-registration-page/company-registration-page.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollsComponent } from './view-polls/view-polls.component';
import { SubscriptionPaymentComponent } from './company-registration/components/subscription-payment/subscription-payment.component';
import { LoginComponent } from './native-login/components/login/login.component';
import { RegisterEmployeeComponent } from './company-features/components/register-employee/register-employee.component';
import { NativeAuthGuard } from './auth/guards';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'company-registration', component: CompanyRegistrationPageComponent },
  { path: 'subscription-payment', component: SubscriptionPaymentComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'register-employee',
    component: RegisterEmployeeComponent,
    canActivate: [NativeAuthGuard],
  },
  {
    path: '',
    component: AuthorizedMainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'how-to-articles',
        component: HowToArticlesListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'article/:id',
        component: ArticleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'createarticle',
        component: ArticleCreationComponent,
        canActivate: [AdminGuard],
      },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path: 'accessdenied/:reason', component: AccessDeniedComponent },
      {
        path: 'article/:id/edit',
        component: ArticleEditComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'createpoll',
        component: CreatePollComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'viewPolls',
        component: ViewPollsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
