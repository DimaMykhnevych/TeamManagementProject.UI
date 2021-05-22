import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterEmployeeComponent } from './components/register-employee/register-employee.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProjectCreationComponent } from './components/project-creation/project-creation.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { DistributeProjectsComponent } from './components/distribute-projects/distribute-projects.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../layout';
import { EmployeeService } from './services/employee.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    RegisterEmployeeComponent,
    NavbarComponent,
    ProjectCreationComponent,
    CreateTeamComponent,
    DistributeProjectsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [EmployeeService, ProjectService],
})
export class CompanyFeaturesModule {}
