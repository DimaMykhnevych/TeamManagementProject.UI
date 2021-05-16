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
<<<<<<< HEAD
import { CompanyRegistrationPageComponent } from './company-registration/components/company-registration-page/company-registration-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'company-registration', component: CompanyRegistrationPageComponent },
=======
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollsComponent } from './view-polls/view-polls.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
>>>>>>> master
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
<<<<<<< HEAD
=======
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
>>>>>>> master
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
<<<<<<< HEAD
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
=======
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
>>>>>>> master
})
export class AppRoutingModule {}
