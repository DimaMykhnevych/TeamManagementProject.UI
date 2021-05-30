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
import { ViewEventsComponent } from './view-events/view-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import { LoginComponent } from './native-login/components/login/login.component';
import { RegisterEmployeeComponent } from './company-features/components/register-employee/register-employee.component';
import { NativeAuthGuard } from './auth/guards';
import { NavbarComponent } from './company-features/templates/navbar/navbar.component';
import { ProjectCreationComponent } from './company-features/components/project-creation/project-creation.component';
import { CreateTeamComponent } from './company-features/components/create-team/create-team.component';
import { DistributeProjectsComponent } from './company-features/components/distribute-projects/distribute-projects.component';
import { EditPollComponent } from './edit-poll/edit-poll.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ChooseEditTeamComponent } from './choose-edit-team/choose-edit-team.component';
import { ReviewEmployeesComponent } from './company-features/components/review-employees/review-employees.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'company-registration', component: CompanyRegistrationPageComponent },
  { path: 'subscription-payment', component: SubscriptionPaymentComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'company-features',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'register-employee',
        pathMatch: 'full',
      },
      {
        path: 'register-employee',
        component: RegisterEmployeeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-employees',
        component: ReviewEmployeesComponent,
      },
      {
        path: 'create-project',
        component: ProjectCreationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-team',
        component: CreateTeamComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'distribute-projects',
        component: DistributeProjectsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-team',
        component: EditTeamComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'choose-edit-team',
        component: ChooseEditTeamComponent,
        canActivate: [AuthGuard],
      },
    ],
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
      {
        path: 'viewEvents',
        component: ViewEventsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'createEvents',
        component: CreateEventComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'createReports',
        component: CreateReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewReports',
        component: ViewReportsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'edit-poll',
        component: EditPollComponent,
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
