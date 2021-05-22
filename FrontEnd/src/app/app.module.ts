import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesService } from './services/articles.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HowToArticlesListComponent } from './how-to-articles-list/how-to-articles-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { HowToArticleCreateComponent } from './how-to-article-details/how-to-article-create/how-to-article-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TagsService } from './services/tags.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HowToArticleEditComponent } from './how-to-article-details/how-to-article-edit/how-to-article-edit.component';
import { ArticleComponent } from './article/article.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ArticleEditComponent } from './article-creation/article-edit.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { TagCreationComponent } from './tag-creation/tag-creation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthorizedMainComponent } from './authorized-main/authorized-main.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { PollsService } from './services/polls.services';
import {MatIconModule} from '@angular/material/icon';
import { ViewPollsComponent } from './view-polls/view-polls.component';
import {MatRadioModule} from '@angular/material/radio'
import { CompanyRegistrationModule } from './company-registration/company-registration.module';
import { ViewEventsComponent } from './view-events/view-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatNativeDateModule } from '@angular/material/core';
import { EventsService } from './services/events.service';
import { NgxMatDatetimePickerModule,  NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    HowToArticlesListComponent,
    AdminComponent,
    HowToArticleCreateComponent,
    HowToArticleEditComponent,
    ArticleComponent,
    SafeHtmlPipe,
    ArticleCreationComponent,
    ArticleEditComponent,
    AccessDeniedComponent,
    LoginRegisterComponent,
    TagCreationComponent,
    ForgotPasswordComponent,
    WelcomePageComponent,
    AuthorizedMainComponent,
    CreatePollComponent,
    ViewPollsComponent,
    ViewEventsComponent,
    CreateEventComponent,
    CreateReportComponent,
    ViewReportsComponent,
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CKEditorModule,
    MatCheckboxModule,
    CompanyRegistrationModule,
    MatIconModule,
    MatRadioModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxMatNativeDateModule
  ],
  providers: [ArticlesService, TagsService, PollsService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
