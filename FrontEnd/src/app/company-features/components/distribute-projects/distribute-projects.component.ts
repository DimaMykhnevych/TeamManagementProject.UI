import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Project } from 'src/app/models/Project';
import { Team } from 'src/app/models/Team';
import { TeamProject } from 'src/app/models/TeamProject';
import { ProjectService } from '../../services/project.service';
import { TeamProjectService } from '../../services/team-project.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-distribute-projects',
  templateUrl: './distribute-projects.component.html',
  styleUrls: ['./distribute-projects.component.css'],
})
export class DistributeProjectsComponent implements OnInit {
  public form: FormGroup;
  public teamProject: TeamProject;
  public filteredTeams: Observable<Team[]>;
  public filteredProjects: Observable<Project[]>;
  private teams: Team[];
  private projects: Project[];

  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _teamProjectService: TeamProjectService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getProjects();
    this.initializeForm();
  }

  public initializeForm(): void {
    this.form = this._builder.group({
      teamId: new FormControl('', Validators.required),
      projectId: new FormControl('', Validators.required),
    });
  }

  get teamId() {
    return this.form.get('teamId');
  }

  get projectId() {
    return this.form.get('projectId');
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    let teamProject: TeamProject = {
      id: '',
      teamId: this.teamId.value.id,
      projectId: this.projectId.value.id,
      Team: null,
      Project: null,
    };
    this._teamProjectService
      .createTeamProject(teamProject)
      .subscribe((resp) => {
        if (resp) {
          this._toastr.success(
            'Project was successfully assigned to the team!'
          );
          this.clearFields(formDirective);
          this.getProjects();
        }
      });
  }

  public projectDisplayFn(project: Project): string {
    return project?.name;
  }

  public teamDisplayFn(team: Team): string {
    return team?.teamName;
  }

  private _filterProjects(value: Project): Project[] {
    let filterValue = value?.name?.toLowerCase();
    if (!filterValue) {
      filterValue = '';
    }
    return this.projects?.filter(
      (option) => option.name?.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterTeams(value: Team): Team[] {
    let filterValue = value?.teamName?.toLowerCase();
    if (!filterValue) {
      filterValue = '';
    }
    return this.teams?.filter(
      (option) => option.teamName?.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private clearFields(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.form.reset();
  }

  private getTeams(): void {
    this._teamService.getTeams().subscribe((resp) => {
      this.teams = resp;
      this.filteredTeams = this.teamId.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterTeams(value))
      );
    });
  }

  private getProjects(): void {
    this._projectService.getProjects().subscribe((resp) => {
      this.projects = resp;
      this.filteredProjects = this.projectId.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProjects(value))
      );
    });
  }
}
