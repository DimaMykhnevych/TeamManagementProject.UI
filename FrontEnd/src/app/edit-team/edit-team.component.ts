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
import { EmployeeService } from '../company-features/services/employee.service';
import { TeamService } from '../company-features/services/team.service';
import { Team } from '../models/Team';
import { UserModel } from '../models/UserModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
  public form: FormGroup;
  public employees: UserModel[];
  public filteredOptions: Observable<string[]>;
  public selectedEmplyees: UserModel[] = [];
  public isTeamAdding: boolean;
  public team: Team;

  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _employeeService: EmployeeService,
    private _teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployees();
    let id = this.activatedRoute.snapshot.queryParams['id'];
    this._teamService.getById(id).subscribe((team: Team) => {
      this.team = team;
      this.selectedEmplyees = team.members;
      this.form.reset({ teamName: this.team.teamName });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.employees
      ?.filter(
        (option) => option.email.toLowerCase().indexOf(filterValue) === 0
      )
      .map((e) => e.email);
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      teamName: new FormControl('', Validators.required),
      members: new FormControl(''),
    });
  }

  private getEmployees(): void {
    this._employeeService.getEmployees().subscribe((resp) => {
      this.employees = resp;
      this.filteredOptions = this.members.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  public mySelectHandler(option: string): void {
    const empl = this.employees.find((e) => e.email === option);
    const idx = this.employees.indexOf(empl);
    this.employees.splice(idx, 1);
    this.selectedEmplyees.push(empl);
    this.members.setValue('');
  }

  public onDeleteBtnClick(employee: UserModel): void {
    this.employees.push(employee);
    const idx = this.selectedEmplyees.indexOf(employee);
    this.selectedEmplyees.splice(idx, 1);
  }

  get teamName() {
    return this.form.get('teamName');
  }

  get members() {
    return this.form.get('members');
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    this.isTeamAdding = true;
    const team: Team = {
      id: this.team.id,
      teamName: this.teamName.value,
      members: this.selectedEmplyees,
      companyId: '283bedee-89ed-45e5-8f22-d6f5f5ec62d0',
      company: null,
      teamProjects: [],
      polls: [],
    };
    this._teamService.update(team).subscribe((resp) => {
      if (resp) {
        this.isTeamAdding = false;
        this._toastr.success('Team was updated successfully!');
        this.clearFields(formDirective);
        this.selectedEmplyees = [];
        this.router.navigateByUrl('/company-features');
      }
    });
  }

  private clearFields(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.form.reset();
  }
}
